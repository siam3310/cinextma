import { Image as ImageProps } from "tmdb-ts";
import { Image } from "@heroui/react";
import { getImageUrl } from "@/utils/movies";
import Gallery from "@/components/ui/overlay/Gallery";
import { Slide } from "yet-another-react-lightbox";
import { useState } from "react";
interface GallerySectionProps {
  images: ImageProps[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const [index, setIndex] = useState<number>(-1);
  const slides: Slide[] = images.map(({ file_path, width, height }) => ({
    src: getImageUrl(file_path, "backdrop", true),
    description: `${width}x${height}`,
  }));

  return (
    <section id="gallery" className="z-[3] flex flex-col gap-2">
      <h4 className="z-10 text-xl font-bold">Gallery</h4>
      <div className="grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.slice(0, 4).map(({ file_path }, index) => (
          <Image
            onClick={() => setIndex(index)}
            key={file_path}
            isBlurred
            isZoomed
            width={300}
            alt={`Image ${index + 1}`}
            src={getImageUrl(file_path, "backdrop")}
            className="aspect-video cursor-pointer"
          />
        ))}
      </div>
      <Gallery open={index >= 0} index={index} close={() => setIndex(-1)} slides={slides} />
    </section>
  );
};

export default GallerySection;
