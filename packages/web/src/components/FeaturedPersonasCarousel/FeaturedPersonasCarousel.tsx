import React, { useState } from "react";
import styles from "./FeaturedPersonasCarousel.module.scss";
import classNames from "classnames";

type FeaturedPersona = {
  name: string;
};

export namespace FeaturedPersonasCarousel {
  export type Props = {};
}

const featuredPersonas: FeaturedPersona[] = [
  { name: "Persona 1" },
  { name: "Persona 2" },
  { name: "Persona 3" },
  { name: "Persona 4" },
];

export function FeaturedPersonasCarousel(
  props: FeaturedPersonasCarousel.Props
) {
  const {} = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlideIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const getNextSlideIndex = () => {
    return currentIndex >= featuredPersonas.length - 1
      ? undefined
      : currentIndex - 1;
  };

  const getPrevSlideIndex = () => {
    return currentIndex <= 0 ? undefined : currentIndex - 1;
  };

  const hasNextSlide = getNextSlideIndex() !== undefined;
  const hasPrevSlide = getPrevSlideIndex() !== undefined;
  const carouselTransformX = `${currentIndex * -100}%`;

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.carousel}>
        <div
          className={styles.slidesWrapper}
          style={{ transform: `translateX(${carouselTransformX})` }}
        >
          {featuredPersonas.map((p, i) => {
            return (
              <CarouselItem
                {...p}
                key={i}
                isCurrentSlide={i === currentIndex}
              />
            );
          })}
        </div>
      </div>
      <button
        className={classNames(styles.carouselArrow)}
        onClick={() => goToSlideIndex(currentIndex - 1)}
        disabled={!hasPrevSlide}
      >
        {"<-"}
      </button>
      <button
        className={classNames(styles.carouselArrow, styles.right)}
        disabled={!hasNextSlide}
        onClick={() => goToSlideIndex(currentIndex + 1)}
      >
        {"->"}
      </button>
    </div>
  );
}

type CarouselItemProps = FeaturedPersona & {
  isCurrentSlide: boolean;
};

const CarouselItem = (props: CarouselItemProps) => {
  return <div className={styles.slide} />;
};
