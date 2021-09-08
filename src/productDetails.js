
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Rating from './Rating';
import { detailsProduct } from './ReduxStore/actions/productAction';


function ProductDetails(props) {
	const [qty, setQty] = useState(0);
	const productDetails = useSelector(state => state.productDetails);
	const { product, loading, error } = productDetails;
	
	const productId = props.match.params.id;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(detailsProduct(productId));
	}, [dispatch, productId]);

	const addToCart = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	}

	return (
			<div>
			{
				loading ? <LoadingBox></LoadingBox>
					: error ? <MessageBox variant="danger">{error}</MessageBox>
						:
				<div className="row top">
				<div className="col-2">
					<img className="large" src={product.image} alt={product.name} />
				</div>
					<div className="col-1">
						<div>
							{product.name}
						</div>
						<Rating rating={product.rating} numReviews={product.numReviews}></Rating>
						<div className="price">Price: ₦{product.price}</div>
						<div>Description: <p>{product.description}</p>
						</div>
						<img src={product.image} alt={product.name}  className="medium" />
					</div>
					<div className="col-1">
						<div className="card card-body">
						<div className="row">
							<div>
								Brand
							</div>
							<div>
								{product.brand}
							</div>		
							</div>
							<div className="row">
								<div>
									Price
								</div>
								<div>
									₦{product.price}
								</div>
							</div>
							<Rating rating={product.rating} numReviews={product.numReviews}></Rating>
							<div className="row">
								<div>
									Status
								</div>
								<div>
									{product.countInStock > 0 ? (
										<div className="success">In Stock</div>
									) : (
											<div className="danger">Unavailable</div>
									)
									}
								</div>
							</div>
							{product.countInStock > 0 && (
							<>
									<div className="row">
								<div>Qty</div>
									<div>
										<select value={qty} onChange={e => setQty(e.target.value)}>
											{
												[...Array(product.countInStock).keys()].map((num) => (
													<option key={num} value={num + 1}>{num + 1 }</option>
												))
											}
										</select>
								</div>
								</div>
								<button onClick={addToCart} className="primary block">Add to Cart</button>
							</>
							)}
						</div>
					</div>
				</div>
			}	
			</div>
		)
	}


export default ProductDetails;
