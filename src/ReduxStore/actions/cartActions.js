import Axios from "axios"
import {
	ADD_ITEM_TO_CART,
	REMOVE_CART_ITEM,
	SHIPPING_CART,
	CART_PAYMENT_METHOD
} from "../constant/constant";
import {api} from "../../config/config"


export const addToCart = (qty, productId) => async (dispatch, getState) => {
	const { data } = await Axios.get(`${api}/products/${productId}`);
	
	dispatch({
		type: ADD_ITEM_TO_CART,
		payload: {
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			product: data._id,
			qty,
		}
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (productId) => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_CART_ITEM, payload: productId
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const cartShippingAddress = (data) => (dispatch, getState) => {
	dispatch({ type: SHIPPING_CART, payload: data });
	localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.cartItems));
};

export const cartPaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_PAYMENT_METHOD, payload: data });
}
