import { useState, useRef, useEffect, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight, Video as VideoIcon } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export type MediaItem =
  | string
  | {
      src: string;
      type?: "image" | "video";
      poster?: string;
      alt?: string;
    };

interface ImageVideoSwiperProps {
  media: MediaItem[];
  slideClassName?: string;
}

const isVideoSrc = (src: string) => {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() || "";
  return ["mp4", "webm", "ogg", "mov", "m4v"].includes(ext);
};

export const ImageVideoSwiper: FC<ImageVideoSwiperProps> = ({
  media,
  slideClassName = "h-64 md:h-96",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const normalize = (item: MediaItem) => {
    if (typeof item === "string") {
      return {
        src: item,
        type: isVideoSrc(item) ? "video" : "image",
        poster: undefined,
        alt: undefined,
      } as const;
    }

    return {
      src: item.src,
      type: item.type ?? (isVideoSrc(item.src) ? "video" : "image"),
      poster: item.poster,
      alt: item.alt,
    } as const;
  };

  const normalized = media.map(normalize);

  const pauseAllVideos = () => {
    videoRefs.current.forEach((v) => {
      try {
        if (!v) return;
        v.pause();
      } catch (e) {}
    });
  };

  useEffect(() => {
    if (!mainSwiper) return;

    const handler = () => {
      pauseAllVideos();

      const idx = mainSwiper.realIndex;
      const item = normalized[idx];
      if (item?.type === "video") {
      }
    };

    mainSwiper.on("slideChange", handler);
    return () => mainSwiper.off("slideChange", handler);
  }, [mainSwiper]);

  return (
    <div className="w-full relative">
      <Swiper
        spaceBetween={10}
        keyboard={{ enabled: true, onlyInViewport: true }}
        loop={true}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        onSwiper={(s) => setMainSwiper(s)}
        modules={[FreeMode, Navigation, Thumbs, Keyboard]}
        className="mySwiper2"
        aria-roledescription="carousel"
      >
        {normalized.map((item, i) => (
          <SwiperSlide
            key={`media-${i}-${item.src}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${normalized.length}`}
            className="flex items-center justify-center bg-gray-50"
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt ?? `Slide ${i + 1}`}
                className={`w-full ${slideClassName} object-contain`}
                style={{ display: "block", margin: "0 auto" }}
              />
            ) : (
              <video
                ref={(el) => {
                  if (!el) return;
                  videoRefs.current[i] = el;
                }}
                controls
                playsInline
                preload="metadata"
                poster={item.poster}
                className={`w-full ${slideClassName} object-contain bg-black`}
                style={{ display: "block", margin: "0 auto" }}
              >
                <source src={item.src} />
                Your browser does not support the video tag.
              </video>
            )}
          </SwiperSlide>
        ))}

        <button
          type="button"
          aria-label="Previous"
          className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 
            z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full flex items-center justify-center cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Next"
          className="custom-next absolute right-4 top-1/2 -translate-y-1/2 
            z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full flex items-center justify-center cursor-pointer shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </Swiper>

      <div className="mt-3">
        <Swiper
          loop={true}
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          aria-label="thumbnails"
        >
          {normalized.map((item, i) => (
            <SwiperSlide
              key={`thumb-${i}-${item.src}`}
              className="cursor-pointer relative"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt ?? `Thumbnail ${i + 1}`}
                  className="w-full h-20 object-cover rounded-md"
                  style={{ display: "block", margin: "0 auto" }}
                />
              ) : item.poster ? (
                <img
                  src={item.poster}
                  alt={item.alt ?? `Video thumbnail ${i + 1}`}
                  className="w-full h-20 object-cover rounded-md"
                  style={{ display: "block", margin: "0 auto" }}
                />
              ) : (
                <div className="w-full h-20 flex items-center justify-center rounded-md bg-gray-200">
                  <VideoIcon className="w-6 h-6" />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageVideoSwiper;
