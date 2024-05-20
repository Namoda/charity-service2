import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative, Autoplay } from 'swiper';
import Hero from './Hero';
import Hero02 from './Hero2';

const HeroContainer = () => {
  return (
    <section>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500]
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500]
          }
        }}
        modules={[EffectCreative, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 5000, // Increased delay for a slower slide change
          disableOnInteraction: false,
        }}
        speed={1500} // Transition speed for smoother effect
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero02 />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HeroContainer;
