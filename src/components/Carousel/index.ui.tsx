import { useState } from "react";
import type { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ImagesSwiperProps {
  imageUrls: string[];
}

export const ImageSwiper: FC<ImagesSwiperProps> = ({ imageUrls }) => {
  console.log(BASE_URL);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={10}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Keyboard]}
        className="mySwiper2"
        aria-roledescription="carousel"
      >
        {imageUrls.map((src, i) => (
          <SwiperSlide
            key={src}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${imageUrls.length}`}
          >
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-64 md:h-96 object-contain"
              style={{ display: "block", margin: "0 auto" }}
            />
          </SwiperSlide>
        ))}

        <button
          type="button"
          aria-label="Imagen anterior"
          className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 
            z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full flex items-center justify-center cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Próxima imagen"
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
          {imageUrls.map((src, i) => (
            <SwiperSlide key={`${src}-thumb`} className="cursor-pointer">
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-20 object-cover rounded-md"
                style={{ display: "block", margin: "0 auto" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSwiper;
