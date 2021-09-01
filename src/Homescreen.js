import React, { useEffect } from 'react';

import ProductsCard from './ProductCards';
import { useDispatch, useSelector, } from 'react-redux';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { productActions } from './ReduxStore/productAction';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList  = useSelector(state => state.productList )
    const {products, loading, error } = productList;
    useEffect(() => {
       dispatch(productActions())
    }, [dispatch]);
    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox>
                :error ? <MessageBox variant="danger">{}error</MessageBox>
                :<div className="row and center">
                {
                    products.map(products => (
                        <ProductsCard key={products._id} products={products} alt={products.name} />
                    ))
                }
                
            </div>
            }
        </div>
    )
}
export default HomeScreen
