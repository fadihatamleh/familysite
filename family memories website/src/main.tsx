import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Disable right-click context menu on images to discourage casual saving
document.addEventListener('contextmenu', (e) => {
    const target = e.target as HTMLElement;
    if (target && target.tagName === 'IMG') {
          e.preventDefault();
    }
});

// Disable native drag-to-save on images
document.addEventListener('dragstart', (e) => {
    const target = e.target as HTMLElement;
    if (target && target.tagName === 'IMG') {
          e.preventDefault();
    }
});

createRoot(document.getElementById("root")!).render(<App />);
