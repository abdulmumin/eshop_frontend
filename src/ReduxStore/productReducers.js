import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_REQUEST, PRODUCT_REQUEST_FAIL, PRODUCT_REQUEST_SUCCESS } from "./constant";

export const produtcReducer = (state = { products: [], loading: true }, action) => {
	switch (action.type) {
		case PRODUCT_REQUEST:
			return { loading: true };
		case PRODUCT_REQUEST_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_REQUEST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	};
};


export const productDetailsReducer = (state = { product: {}, loading: true }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false, error: action.payload
			};
		default:
			return state
	}
}