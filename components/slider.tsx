import { SwiperOptions } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const options: SwiperOptions = {
  slidesPerView: 1,
  loop: true,
}

export default function Slider({ children }: { children: SwiperSlide }) {
  return (
    <Swiper {...options}>
      { children }
    </Swiper>
  );
}