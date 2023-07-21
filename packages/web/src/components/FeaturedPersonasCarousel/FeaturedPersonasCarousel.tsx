import React, { useState } from "react";
import styles from "./FeaturedPersonasCarousel.module.scss";
import classNames from "classnames";
import { ClassesProp } from "@/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";

export type FeaturedPersona = {
  name: string;
  img: string;
};

export namespace FeaturedPersonasCarousel {
  export type Props = {
    items: FeaturedPersona[];
    classes?: ClassesProp<"root">;
  };
}

export function FeaturedPersonasCarousel(
  props: FeaturedPersonasCarousel.Props
) {
  const { items, classes } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlideIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const getNextSlideIndex = () => {
    return currentIndex >= items.length - 1 ? undefined : currentIndex - 1;
  };

  const getPrevSlideIndex = () => {
    return currentIndex <= 0 ? undefined : currentIndex - 1;
  };

  const hasNextSlide = getNextSlideIndex() !== undefined;
  const hasPrevSlide = getPrevSlideIndex() !== undefined;
  const carouselTransformX = `${currentIndex * -100}%`;

  return (
    <div className={classNames(styles.outerWrapper, classes?.root)}>
      <div className={styles.upperContent}>
        <button
          className={classNames(styles.carouselArrow)}
          onClick={() => goToSlideIndex(currentIndex - 1)}
          disabled={!hasPrevSlide}
        >
          <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
        </button>

        <div className={styles.carousel}>
          <div
            className={styles.slidesWrapper}
            style={{ transform: `translateX(${carouselTransformX})` }}
          >
            {items.map((p, i) => {
              return (
                <CarouselItem
                  {...p}
                  key={i}
                  goToSlide={() => goToSlideIndex(i)}
                  isCurrentSlide={i === currentIndex}
                />
              );
            })}
          </div>
        </div>

        <button
          className={classNames(styles.carouselArrow, styles.right)}
          disabled={!hasNextSlide}
          onClick={() => goToSlideIndex(currentIndex + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
        </button>
      </div>

      <div className={styles.paginators}>
        {items.map((p, i) => (
          <button
            className={classNames(
              styles.pip,
              i === currentIndex && styles.current
            )}
            onClick={() => goToSlideIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

type CarouselItemProps = FeaturedPersona & {
  isCurrentSlide: boolean;
  goToSlide: () => void;
};

const CarouselItem = ({
  img,
  isCurrentSlide,
  name,
  goToSlide,
}: CarouselItemProps) => {
  return (
    <div className={classNames(styles.slide, isCurrentSlide && styles.current)}>
      <div className={styles.imgWrapper} onClick={goToSlide}>
        <div
          className={styles.img}
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
      <p className={styles.name} onClick={goToSlide}>
        {name}
      </p>
    </div>
  );
};
