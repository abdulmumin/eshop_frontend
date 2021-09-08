import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import CheckoutSteps from './CheckoutSteps'
import { cartPaymentMethod } from './ReduxStore/actions/cartActions';

const PaymentMethodComponent = (props) => {
	const [paymentMethod, setPaymentMethod] = useState("paystack");
	const dispatch = useDispatch()
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(cartPaymentMethod(paymentMethod))
		props.history.push('placeorder')
	}

	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Payment Method</h1>
				</div>
				<div>
					<div>
						<input
							type="radio"
							id="paystack"
							name="paymentMethod"
							value="paystack"
							required
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></input>
						<label htmlFor="paystack">PayStack</label>
 					</div>
				</div>
				<div>
					<div>
						<input
							type="radio"
							id="paypal"
							value="paypal"
							name="paymentMethod"
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
							></input>
						<label htmlFor="paypal">PayPal</label>
 					</div>
				</div>
				<div>
					<button type="submit" className="primary">Continue</button>
				</div>
			</form>
		</div>
	)
}

export default PaymentMethodComponent
