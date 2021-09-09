import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PlaceOrder from './PlaceOrder';
import CartScreen from './CartScreen';
import Slides from './customSlider/Slides';
// import Footer from './Footer';

import PaymentMethodComponent from './PaymentMethodComponent';
import ProductDetails from './productDetails';
import { signout } from './ReduxStore/actions/userActions';
import RegisterScreen from './RegisterScreen';
import ShippingComponent from './ShippingComponent';
import SingInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';

function App() {
  const userSignin = useSelector(state => state.userSignin);
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
  <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">E-shop</Link>
          </div>
          <div>
            <Link to="/cart">Cart
            {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
            ) }</Link>
        
              {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name}<i className="fa fa caret-down">
                    </i>
                  </Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Slides /> <br />
          <Route exact path="/cart/:id?" component={CartScreen}></Route>
          <Route exact path="/" component={HomeScreen}></Route>
          <Route path="/product/:id" component={ProductDetails}></Route>
          <Route path="/signin" component={SingInScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingComponent}></Route>
          <Route path="/payment" component={PaymentMethodComponent}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  )
}

export default App
