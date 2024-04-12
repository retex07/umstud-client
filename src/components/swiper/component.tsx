import cn from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { ReactComponent as ChevronLeftSvg } from "static/images/chevron-left.svg";
import { ReactComponent as ChevronRightSvg } from "static/images/chevron-right.svg";
import "./styles.scss";

interface Props {
  children: ReactNode;
  showSlides?: number;
}

export default function Swiper(props: Props) {
  const { children, showSlides = 3 } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1220);

  const maxShowSlides = isMobile ? 1 : showSlides;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 1220);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const childrenArray = React.Children.toArray(children);

  const goPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < childrenArray.length - maxShowSlides
        ? prevIndex + 1
        : prevIndex
    );
  };

  return (
    <div className="swiper">
      <div className="swiper__wrapper">
        <button
          className={cn("swiper__action", {
            "swiper__action-inactive": currentIndex === 0,
          })}
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeftSvg />
        </button>
        <div className="swiper__slider">
          {childrenArray.slice(currentIndex, currentIndex + maxShowSlides)}
        </div>
        <button
          className={cn("swiper__action", {
            "swiper__action-inactive":
              currentIndex >= childrenArray.length - maxShowSlides,
          })}
          onClick={goNext}
          disabled={currentIndex >= childrenArray.length - maxShowSlides}
        >
          <ChevronRightSvg />
        </button>
      </div>
      <div className="swiper__dots">
        {[...Array(childrenArray.length - maxShowSlides + 1)].map(
          (_, index) => (
            <div
              key={index}
              className={cn("swiper__dot", {
                active: currentIndex === index,
              })}
              onClick={() => setCurrentIndex(index)}
            />
          )
        )}
      </div>
    </div>
  );
}
