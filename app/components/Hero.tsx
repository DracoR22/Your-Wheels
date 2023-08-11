'use client'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Hero = () => {
  return (
    <>
     <div className=''>
       <Carousel showArrows={true} autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false} showStatus={false}>
        <div>
            <img src='/banner/herowheels.jpg'/>
        </div>
        <div>
            <img src='/banner/ram.jpg'/>
        </div>
        <div>
            <img src='/banner/p1.jpg'/>
        </div>
        <div>
            <img src='/banner/for.jpg'/>
        </div>
       </Carousel>
     </div>
    </>
  )
}

export default Hero