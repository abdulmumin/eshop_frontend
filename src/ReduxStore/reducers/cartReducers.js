import { ADD_ITEM_TO_CART, REMOVE_CART_ITEM, SHIPPING_CART, CART_PAYMENT_METHOD } from "../constant/constant";
import { CART_EMPTY } from "../constant/orderConstant";



export const cartReducers = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			const item = action.payload;
			const existingCartItem = state.cartItems.find((x) => x.product === item.product);
			if (existingCartItem) {
				return {  
					...state,
					cartItems: state.cartItems.map(x => x.product === existingCartItem.product ? item : x)
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] }
			}
		case REMOVE_CART_ITEM:
			return { 
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload)
			}
		case SHIPPING_CART:
			return { ...state, shippingAddress: action.payload };
		case CART_PAYMENT_METHOD:
			return { ...state, paymentMethod: action.payload };
		case CART_EMPTY:
			return { ...state, cartItems: [] };
		default:
			return state;
	}
};
