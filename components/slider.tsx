import SwiperCore, { Autoplay, Pagination, EffectFade, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Autoplay, Pagination, EffectFade]);

const options: SwiperOptions = {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: true,
  pagination: true,
}

export default function Slider({ children }: { children: SwiperSlide }) {
  return (
    <Swiper {...options}>
      { children }
    </Swiper>
  );
}