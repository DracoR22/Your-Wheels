'use client'

import { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

const Hero = () => {

const slides = [
  {
    url: '/banner/ram.jpg'
  },
  {
    url: '/banner/herowheels.jpg'
  },
  {
    url: '/banner/pbanner.jpg'
  },
  {
    url: '/banner/forerunner.jpg'
  },
];

// Functional Slides:

const [currentIndex, setCurrentIndex] = useState(0)

const prevSlide = () => {
  const isFirstSlide = currentIndex === 0
  const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;

  setCurrentIndex(newIndex)
}

const nextSlide = () => {
  const isLastSlide = currentIndex === slides.length - 1
  const newIndex =  isLastSlide ? 0 : currentIndex + 1

  setCurrentIndex(newIndex) 
}

// Functional Dots

  const goToSlide = (slideIndex: any) => {
  setCurrentIndex(slideIndex)
}

useEffect(() => {
  // Auto slide every 5 seconds
  const interval = setInterval(() => {
    nextSlide();
  }, 4000);

  return () => {
    clearInterval(interval);
  };
}, [currentIndex, nextSlide]);

  return (
    <div className='h-[400px] w-full m-auto px-4 relative group'>
       <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-300'> </div>
       {/* Left Arrow */}
       <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} color='white'/>
       </div>
       {/* Right Arrow */}
       <div onClick={nextSlide} className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer'>
        <BsChevronCompactRight size={30} color='white'/>
       </div>
       {/* Dots */}
       <div className='flex justify-center top-4 py-2 text-black'>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>
            <RxDotFilled/>
          </div>
        ))}
       </div>

      </div>
  )
}

export default Hero