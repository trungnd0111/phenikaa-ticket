import React from 'react'
import { useState } from 'react'
import { carouselData } from '../../../../dummyData'
import Carousel from './Carousel'
import "./homeCarousels.css"
export default function Carousels() {

  const [items, setItem] = useState(carouselData)
  return (
    <div>
      <section className='carouselHome'>
        <Carousel items={items} />
      </section>
      <div className='margin'>
        
      </div>
    </div>
  )
}
