// Google Drive integration — pulls real family photos/albums from a shared
// Google Drive folder so the site's gallery reflects actual family photos
// instead of hardcoded placeholders. Requires two env vars set at build time:
//   VITE_GOOGLE_DRIVE_API_KEY        - restricted Drive API key
//   VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID - id of the shared root folder
import type { Album } from "./data";

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY as string | undefined;
const ROOT_FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID as string | undefined;

const DRIVE_API = "https://www.googleapis.com/drive/v3/files";
const FOLDER_MIME = "application/vnd.google-apps.folder";

interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    thumbnailLink?: string;
}

function isFolder(file: DriveFile): boolean {
    return file.mimeType === FOLDER_MIME;
}

function isImage(file: DriveFile): boolean {
    return file.mimeType.startsWith("image/");
}

// Swap the size suffix on a Drive thumbnail URL (e.g. "=s220") for a larger one
// so the same link can be reused for both grid thumbnails and full-size views.
function resize(thumbnailLink: string, size: number): string {
    return thumbnailLink.replace(/=s\d+$/, `=s${size}`);
}

async function listChildren(parentId: string): Promise<DriveFile[]> {
    if (!API_KEY) return [];
    let files: DriveFile[] = [];
    let pageToken: string | undefined;

  do {
        const params = new URLSearchParams({
                q: `'${parentId}' in parents and trashed = false`,
                fields: "nextPageToken, files(id,name,mimeType,thumbnailLink)",
                pageSize: "1000",
                key: API_KEY,
        });
        if (pageToken) params.set("pageToken", pageToken);

        const res = await fetch(`${DRIVE_API}?${params.toString()}`);
        if (!res.ok) break;
        const data = await res.json();
        files = files.concat(data.files || []);
        pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

function prettifyTitle(name: string): string {
    const match = name.match(/^(\d{4})_(\d{2})(?:_(\d{2}))?$/);
    if (match) {
          const [, year, month, day] = match;
          const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          const monthName = months[parseInt(month, 10) - 1] || month;
          return day ? `${monthName} ${parseInt(day, 10)}, ${year}` : `${monthName} ${year}`;
    }
    return name.replace(/[_-]+/g, " ");
}

function dateLabel(name: string): string {
    const match = name.match(/^(\d{4})_(\d{2})(?:_(\d{2}))?$/);
    if (match) {
          const [, year, month] = match;
          const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          return `${months[parseInt(month, 10) - 1] || month} ${year}`;
    }
    return "";
}

let cachedAlbums: Album[] | null = null;

export function driveConfigured(): boolean {
    return Boolean(API_KEY && ROOT_FOLDER_ID);
}

// Builds Album[] objects (same shape the site already uses) from the photos
// and folders found in the shared Google Drive folder.
export async function fetchDriveAlbums(): Promise<Album[]> {
    if (!driveConfigured() || !ROOT_FOLDER_ID) return [];
    if (cachedAlbums) return cachedAlbums;

  try {
        const rootChildren = await listChildren(ROOT_FOLDER_ID);
        const fullFolder = rootChildren.find((f) => isFolder(f) && f.name.toLowerCase() === "full");
        const baseFolderId = fullFolder ? fullFolder.id : ROOT_FOLDER_ID;
        const items = await listChildren(baseFolderId);

      const subFolders = items.filter(isFolder);
        const looseFiles = items.filter((f) => !isFolder(f) && isImage(f) && f.thumbnailLink);

      const folderAlbums = await Promise.all(
              subFolders.map(async (folder) => {
                        const children = await listChildren(folder.id);
                        const images = children.filter((f) => isImage(f) && f.thumbnailLink);
                        if (images.length === 0) return null;

                                     const cover = images[0];
                        const photos = images.slice(0, 30).map((f) => resize(f.thumbnailLink as string, 1600));

                                     const album: Album = {
                                                 id: folder.id,
                                                 title: prettifyTitle(folder.name),
                                                 description: `A collection of ${images.length} family photo${images.length === 1 ? "" : "s"}.`,
                                                 cover: resize(cover.thumbnailLink as string, 800),
                                                 photoCount: images.length,
                                                 date: dateLabel(folder.name) || prettifyTitle(folder.name),
                                                 category: "everyday",
                                                 photos,
                                     };
                        return album;
              })
            );

      const albums: Album[] = folderAlbums.filter((a): a is Album => a !== null);

      if (looseFiles.length > 0) {
              const cover = looseFiles[0];
              albums.push({
                        id: "misc",
                        title: "Family Favorites",
                        description: `A collection of ${looseFiles.length} family photo${looseFiles.length === 1 ? "" : "s"}.`,
                        cover: resize(cover.thumbnailLink as string, 800),
                        photoCount: looseFiles.length,
                        date: "",
                        category: "everyday",
                        photos: looseFiles.slice(0, 30).map((f) => resize(f.thumbnailLink as string, 1600)),
              });
      }

      albums.sort((a, b) => a.title.localeCompare(b.title));

      cachedAlbums = albums;
        return albums;
  } catch (error) {
        console.error("Failed to load albums from Google Drive", error);
        return [];
  }
}
