import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Album, categoryColors } from "@/lib/data";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const [open, setOpen] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(30);

  const prev = () => setPhotoIdx((i) => (i - 1 + album.photos.length) % album.photos.length);
  const next = () => setPhotoIdx((i) => (i + 1) % album.photos.length);

  return (
    <>
      {/* Card */}
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(139,69,19,0.15)" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="group cursor-pointer rounded-xl overflow-hidden bg-card border border-border"
        style={{ boxShadow: "0 4px 16px -4px rgba(139,69,19,0.08)" }}
        onClick={() => { setOpen(true); setPhotoIdx(0); setVisibleCount(30); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {/* Cover */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          {/* Photo count badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
            <Images className="w-3 h-3" />
            {album.photoCount} photos
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              className="font-semibold text-card-foreground text-base leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {album.title}
            </h3>
            <span
              className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[album.category]}`}
            >
              {album.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {album.description}
          </p>
          <span className="text-xs text-muted-foreground">{album.date}</span>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-card rounded-2xl overflow-hidden max-w-6xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="relative h-[70vh] md:h-[80vh] bg-muted">
                <img
                  src={album.photos[photoIdx]}
                  alt={`${album.title} photo ${photoIdx + 1}`}
                  className="w-full h-full object-contain"
                />
                {/* Prev/Next */}
                {album.photos.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                {/* Counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white bg-black/40 px-3 py-1 rounded-full">
                  {photoIdx + 1} / {album.photos.length}
                </div>
              </div>

              {/* Album info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h2
                    className="text-xl font-bold text-card-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {album.title}
                  </h2>
                  <span className="text-xs text-muted-foreground">{album.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{album.description}</p>
                {/* Thumbnail strip */}
                {album.photos.length > 1 && (
                  <div className="flex gap-2 mt-4">
                    {album.photos.slice(0, visibleCount).map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setPhotoIdx(i)}
                        className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition-all ${
                          i === photoIdx ? "border-primary scale-105" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={p} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
              {visibleCount < album.photos.length && (
              <button onClick={() => setVisibleCount((c) => c + 30)} className="mt-2 text-xs font-medium text-primary hover:underline">Load more photos</button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
