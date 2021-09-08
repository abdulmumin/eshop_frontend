import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { createdOrder } from './ReduxStore/actions/orderActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

import { ORDER_CREATE_RESET } from './ReduxStore/constant/orderConstant';

// Paystack
import { usePaystackPayment } from 'react-paystack';


export default function PlaceOrder(props) {
	const cart = useSelector(state => state.cart);
	const createOrder = useSelector(state => state.createOrder);
	console.log(createOrder);
	const { loading, error, success, order } = createOrder;

	const paystackConfig = {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      amount: cart.totalPrice*100,
      publicKey: "STRIPE_API_KEYS",
	};

	const dispatch = useDispatch()
	// you can call this function anything
	const paystackOnSuccess = (reference) => {
		dispatch(createdOrder({ ...cart, orderItems: cart.cartItems }));
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const paystackOnClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
	const initializePayment = usePaystackPayment(paystackConfig);
     
  	if (!cart.paymentMethod) {
		props.history.push('/payment');    
	};
	const toPrice = (num) => Number(num.toFixed(2));
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);
	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	

	const placeOrderHandler = (e) => {
		e.preventDefault();
		initializePayment(paystackOnSuccess, paystackOnClose);
	};
	console.log(order);
	useEffect(() => {
		if (success) {
			props.history.push(`/order/${order._product}`);
			dispatch({ type: ORDER_CREATE_RESET });
			alert("payment Successefully")
		}
	}, [dispatch, success, props.history, order]);

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className="row top">
				<div className="col-2">
					<ul>
						<li>
							<div className="card card-body">
								<h2> Shipping Address</h2>
								<p>
									<strong>Name:</strong> {cart.shippingAddress.fullName} <br />
									<strong>Address: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city},
									{cart.shippingAddress.postalCode}, {cart.shippingAddress.country},
								</p>
							</div>
						</li>
						<li>
							<div className="card card-body">
								<h2>Payment Method</h2>
								<p>
									<strong>Method:</strong> {cart.paymentMethod}
									</p>
							</div>
						</li>
						<li>
							<div className="card card-body">
								<h2>Order Items</h2>
								 <ul>
            {cart.cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div title="add more" className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
									<div>
								 </div>
									<div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                
                </div>
              </li>
            ))}
          </ul>
							</div>
						</li>
					</ul>
				</div> 
				<div className="col-1">
					<div className="card card-body">
						<ul>
							<li>
								<h2>Order Summary</h2>
							</li>
							<li>
								<div className="row">
									<div>Items</div>
									<div>${cart.itemsPrice.toFixed(2)}</div>
								</div>
							</li><br />
							<li>
								<div className="row">
									<div>Shipping</div>
									<div>${cart.shippingPrice.toFixed(2)}</div>
								</div>
							</li><br />
							<li>
								<div className="row">
									<div>Tax</div>
									<div>${cart.taxPrice.toFixed(2)}</div>
								</div>
							</li><br />
							<li>
								<div className="row">
									<div><strong>Order Total</strong></div>
									<div>$<strong>{cart.totalPrice.toFixed(2)}</strong></div>
								</div>
							</li>
							<li>
								<button className="primary block" type="button" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</button>
							</li>
							{loading && <LoadingBox></LoadingBox>}
							{error && <MessageBox variant="danger">{error}</MessageBox>}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
