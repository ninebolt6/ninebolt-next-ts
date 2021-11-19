import SwiperCore, { Autoplay, Pagination, EffectFade, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlideProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

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

export default function Slider({ children }: SwiperSlideProps) {
  return (
    <Swiper {...options}>
      { children }
    </Swiper>
  );
}