import React, { useState } from "react";

const Slider = ({ thumbnail, eachThumbnail }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === eachThumbnail.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? eachThumbnail.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative w-full flex justify-center items-center h-[19rem] overflow-hidden">
      <div
        className="absolute inset-0  "
        style={{
          backgroundImage: `url(https://meetoonim.com/${eachThumbnail[currentSlide]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
        }}
      />
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(${currentSlide * 100}%)` }}
      >
        {eachThumbnail.map((imdAdd, index) => (
          <div className="flex-shrink-0 w-full" key={index}>
            <img
              src={`https://meetoonim.com/${imdAdd}`}
              alt={thumbnail}
              className={` mx-auto max-w-[max-content] w-full max-h-80 ${eachThumbnail.length <= 1 && 'max-w-[26.34rem]'}  `}
              />
          </div>
        ))}
      </div>
      {eachThumbnail.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white rounded-full"
            onClick={prevSlide}
          >
            &#10094;
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white rounded-full"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;
