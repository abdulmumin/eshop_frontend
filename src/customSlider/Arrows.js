import React from 'react' 

const Arrows = ({prevSlide,nextSlide})=>{
return(
    <div className="arrows">
        <span className="next" onClick={nextSlide}>&#10094;</span>
        <span className="prev" onClick={nextSlide}>&#10094;</span>

    </div>
)

}
export default Arrows