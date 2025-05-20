import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper as ReactSwiper, SwiperClass, SwiperSlide } from "swiper/react";

import { ReactComponent as ChevronLeftSvg } from "@/static/images/chevron-left.svg";
import { ReactComponent as ChevronRightSvg } from "@/static/images/chevron-right.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Swiper.scss";

interface Props {
  children: ReactNode;
  showSlides?: number;
  autoplay?: boolean;
  reverseForAutoplay?: boolean;
}

export default function Swiper(props: Props) {
  const [isAutoplay, setIsAutoplay] = useState(!!props.autoplay);
  const swiperRef = React.useRef<SwiperClass>();

  function offAutoplay() {
    if (isAutoplay) {
      swiperRef.current?.autoplay?.stop();
      setIsAutoplay(false);
    }
  }

  return (
    <ReactSwiper
      className={classNames(`umstud-swiper`, {
        "umstud-swiper__carousel-continuous": isAutoplay,
      })}
      modules={[
        FreeMode,
        Pagination,
        Navigation,
        ...(isAutoplay ? [Autoplay] : []),
      ]}
      loop={true}
      speed={isAutoplay ? 3000 : 500}
      autoplay={
        isAutoplay
          ? {
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: !!props.reverseForAutoplay,
            }
          : false
      }
      freeMode={
        isAutoplay
          ? {
              enabled: true,
              sticky: false,
              momentum: true,
              momentumBounce: false,
            }
          : false
      }
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      slidesPerView="auto"
      spaceBetween={16}
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: props.showSlides || 4 },
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {React.Children.map(props.children, (child, index) => (
        <SwiperSlide className="umstud-swiper__slide" key={index}>
          {child}
        </SwiperSlide>
      ))}

      <div className="swiper-button-prev" onClick={offAutoplay}>
        <ChevronLeftSvg />
      </div>
      <div className="swiper-button-next" onClick={offAutoplay}>
        <ChevronRightSvg />
      </div>

      <div className="swiper-pagination" onClick={offAutoplay} />
    </ReactSwiper>
  );
}
