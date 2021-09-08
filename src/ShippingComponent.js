import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps'
import { cartShippingAddress } from './ReduxStore/actions/cartActions';

export default function ShippingComponent(props) {
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch()
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;
	if (!userInfo) {
		props.history.push('/signin')
	}
	
	const [fullName, setFullName] = useState(shippingAddress.fullName);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);


	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(cartShippingAddress({ fullName, address, city, postalCode, country }));
		props.history.push('/payment');
	}
	return (
		<div>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Shipping Address</h1> 
				</div>
				<div>
					<label htmlFor="fullName">full Name</label>
					<input
						type="text"
						id="fullName"
						value={fullName}
						placeholder="Enter full name"
						onChange={(e) => setFullName(e.target.value)}
						required
					></input>
				</div>
				<div>
					<label htmlFor="fullName">Address</label>
					<input
						type="text"
						id="address"
						value={address}
						placeholder="Enter Address"
						onChange={(e) => setAddress(e.target.value)}
						required
					></input>
				</div>
				<div>
					<label htmlFor="fullName">City</label>
					<input
						type="text"
						id="city"
						value={city}
						placeholder="Enter City"
						onChange={(e) => setCity(e.target.value)}
						required
					></input>
				</div>
				<div>
					<label htmlFor="fullName">Postal Code</label>
					<input
						type="text"
						id="postalcode"
						value={postalCode}
						placeholder="Enter Postal Code"
						onChange={(e) => setPostalCode(e.target.value)}
						required
					></input>
				</div>
				<div>
					<label htmlFor="fullName">Country</label>
					<input
						type="text"
						id="country"
						value={country}
						placeholder="Enter Country"
						onChange={(e) => setCountry(e.target.value)}
						required
					></input>
				</div>
				<div>
					<label />
					<button className="primary">Continue</button>
				</div>
			</form>
		</div>
	)
}
