import React,{useEffect,useState } from 'react'
import Arrows from './Arrows'
import Dots from './Dots'
import imageContainer from './imageContainer'
import {ImageSlide} from './ImageSlider'
import"./sLide.css"
const len= ImageSlide.length +1;
const Slide = () => {
    const [activeIndex, setActiveIndex] =useState(0);

    useEffect(()=>{
        const interval =setInterval(()=>{
            setActiveIndex(activeIndex=== len ? 0:activeIndex +1)
        },3000)
            clearInterval(interval)
} ,[activeIndex]);
    return(
        <div className="sLide-container">
            <imageContainer activeIndex={activeIndex} ImageSlide={ImageSlide}/>
            <Dots oncLick={activeIndex=>setActiveIndex(activeIndex)} ImageSlide={ImageSlide}/>
            <Arrows prevSlide={() =>setActiveIndex(activeIndex < 1  ? len : activeIndex-1)}
            nextSlide={()=>setActiveIndex(activeIndex===len ?0 :activeIndex +1)} />
        </div>
    )
};

export default SLide;