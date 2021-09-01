import React from 'react'
import imageSlider from './imageSlider'
const ImageContainer =({imageSlide, activeIndex}) =>{
    return(
        <div className="slides">
            {
                imageSlider.map((sLide, index) =>(
                    <div key={index} className={activeIndex === index ? "sLides" : "inactive"}>
                        <img className="sLide-image" src={sLide.src} alt={sLide.title}/>
                        <span className="sLide-title">{sLide.title}</span>
                        <span className="sLide-text">{sLide.description}</span>

                    </div>
                )
            }

        </div>

    )
}
export default ImageContainer;