import React from 'react'
import imageSlider from './imageSlider'

const Dots = ({activeIndex, onclick, imageslide}) =>{
return(
    <div className="all-dots">
        {
            imageSlider.map((slide,index)=>(
                <span key={index} onClick={() => onclick(index)} className={activeIndex === index ? "dot active-dot" : "dot"}></span>
            ))
        }

    </div>
)


}
export default Dots