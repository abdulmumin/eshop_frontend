import axios from "axios";
import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "./constant"

export const cartAction = (qty, productId) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${productId}`);
	dispatch({
		type: ADD_CART_ITEM, payload:
		{
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			product: data._id,
			qty,
		}
	});	
};

export const removeCartItem = (productId) => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_CART_ITEM, payload: productId
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

