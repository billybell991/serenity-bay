import { useState, useEffect } from "react";
import { loadImages, type ImageStore } from "@/lib/image-data";

/** Hook that returns the image store and re-reads on storage/custom events. */
export function useImages(): ImageStore {
  const [images, setImages] = useState<ImageStore>(loadImages);

  useEffect(() => {
    const handler = () => setImages(loadImages());
    window.addEventListener("images-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("images-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return images;
}
