import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "./constant";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_CART_ITEM:
			const item = action.payload;
			const existingCartItems = state.cartItems.find((x) => x.product === item.product);
			if (existingCartItems) {
				return { ...state, cartItems: state.cartItems.map((x) => x.product === existingCartItems.product ? item : x) }
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		case REMOVE_CART_ITEM:
			return { ...state, cartItems: state.cartItems.filter((x) => x.product !== action.payload) };
		default:
			return state;
		}
}