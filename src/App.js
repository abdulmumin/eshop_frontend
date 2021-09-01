import React from "react";
import {Route, Link } from 'react-router-dom';
import HomeScreen from "./Homescreen"; 
import ProductDetails from "./productDetails"

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link href="/">E-commerce</Link>
        </div>
        <div>
        <Link href="/">Carts</Link>
        <Link href="/">Sign In</Link>
        </div>
        </header>
        <main>
          <Route exact path='/' component={HomeScreen}/>
          <Route path="/product/:id" component={ProductDetails}/>
        </main>
        <footer className="row center">
                All right reserved IT E-commerce {new Date().getFullYear()}
            </footer>  
    </div>
  );
}

export default App;
