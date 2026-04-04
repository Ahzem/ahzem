"use client";

import { GALLERY_IMAGES } from "../portfolio-data";
import { GalleryLightbox, useGalleryLightbox } from "../components/gallery-lightbox";
import { GalleryTile } from "../components/gallery-tile";

export function GalleryPageClient() {
  const { lightbox, lbVisible, openLb, closeLb } = useGalleryLightbox();

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {GALLERY_IMAGES.map((image, index) => (
          <div key={image.src} className="mb-5 break-inside-avoid">
            <GalleryTile src={image.src} index={index} onClick={openLb} />
          </div>
        ))}
      </div>
      {lightbox && (
        <GalleryLightbox
          lightbox={lightbox}
          lbVisible={lbVisible}
          onClose={closeLb}
        />
      )}
    </>
  );
}
