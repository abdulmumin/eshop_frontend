import React from 'react';
import {Link} from 'react-router-dom'
import Rating from './Rating';

const ProductsCard =({products}) => {
return(
    <div className="card">
        <Link to={`/product/${products._id}`}>
          <img className="medium" src={products.image} alt={products.name} />
        </Link>
        <div className="card-body">
            <Link to={`/product/${products._id}`}>
                <Rating numReviews={products.numReviews} rating={products.rating}></Rating>
            <span>{products.name}</span>
            </Link>
            <span>{products.price}</span>  
            </div> 

    </div>
)

};

export default ProductsCard