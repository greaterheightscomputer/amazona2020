//Implementing rating system

import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
    <BrowserRouter>
        <div className="grid-container">
        {/*header being*/}        
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>  
                    &#9776;  
                    </button>
                    <Link to="/">amazona</Link>
                    {/*<a href="index.html">amazona</a> it is replace with the above Link componet*/}
                </div>      
                <div className="header-links">
                    <a href="cart.html">Cart</a>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}</Link> 
                        :
                        <Link to="/signin">Sign In</Link>
                    }
                    { userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <a href="#" >Admin</a>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/productsList">Products</Link>
                                </li>
                            </ul>
                        </div>                        
                    )}
                </div>      
            </header>
            {/*header end*/}
            
            {/*aside being*/}
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul className="categories">
                    <li>                        
                        <Link to="/category/Pants">Pants</Link>                                           
                    </li>
                    <li>                        
                        <Link to="/category/Shirts">Shirts</Link>                                             
                    </li>
                </ul>
            </aside>
            {/*aside end*/}
            
            {/*main being*/}
            <main className="main">
                <div className="content">
                    
                    {/*SettingUp Route path*/}
                    <Route path="/" exact={true} component={HomeScreen} />
                    <Route path="/products/:id" component={ProductScreen} />                
                    <Route path="/cart/:id?" component={CartScreen} /> {/*path="/cart/:id?" the ? means id is optional*/}
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/productsList" component={ProductsScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    {<Route path="/orders" component={OrdersScreen} />}                    
                    <Route path="/category/:id" component={HomeScreen} />                                         
                    {/*SettingUp Route path*/}                    
                </div>
            </main>
            {/*main end*/}
                    
            {/*footer being*/}
            <footer className="footer">
                All right reserved. August 2020.
            </footer>
            {/*footer end*/}
        </div>
    </BrowserRouter>    
  );
}

export default App;
