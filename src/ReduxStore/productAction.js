import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_REQUEST,
	PRODUCT_REQUEST_FAIL,
	PRODUCT_REQUEST_SUCCESS
} from "./constant"
import Axios from 'axios';

export const productActions = () => async (dispatch) => {
	dispatch({
		type: PRODUCT_REQUEST
	});
	try {
		const { data } = await Axios.get('/api/products');
		dispatch({ type: PRODUCT_REQUEST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_REQUEST_FAIL, payload: error });
	}
};


export const productDetailsActions = (productId) => async (dispatch) => {
	dispatch({
		type: PRODUCT_DETAILS_REQUEST, payload: productId
	});
	try {
		const { data } = await Axios.get(`/api/products/${productId}`);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response
				&& error.response.data.message
				? error.response.data.message
				: error.message
		});
	}
}