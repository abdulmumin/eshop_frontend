import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import thunk from 'redux-thunk'
import { cartReducers } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducer";
import {productDetailsReducer, productReducer} from "./reducers/productReducers";
import { userRegisterReducer, userSingnInReducer } from "./reducers/userReducers";


const initialState = {
	userSignin: {
		userInfo: localStorage.getItem("userInfo") ?
			JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
	cart: {
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [], 
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: {} 
	},
};

const reducer =combineReducers({
	productList: productReducer,
	productDetails: productDetailsReducer,
	cart: cartReducers,
	userSignin: userSingnInReducer,
	userRegister: userRegisterReducer,
	createOrder: orderReducer,
})
  
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))


export default store;