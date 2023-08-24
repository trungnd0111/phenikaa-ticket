import React from 'react'
import CarouselCard from './CarouselCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Carousel({ items }) {

  const SampleNextArrow = (props) => {
    const { onClick } = props
    return (
      <div className='control-btn' onClick={onClick}>
        <button className='next'>
          <i class='fa fa-chevron-right'></i>
        </button>
      </div>
    )
  }
  const SamplePrevArrow = (props) => {
    const { onClick } = props
    return (
      <div className='control-btn' onClick={onClick}>
        <button className='prev'>
          <i class='fa fa-chevron-left'></i>
        </button>
      </div>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: false,
  };

  return (
    <div>
      <div className='carouselContainer'>
        <Slider {...settings}>
          {items.map((item, index) => {
            return <CarouselCard key={item.id} item={item} />
          })}
        </Slider>
      </div>
    </div >
  )
}
