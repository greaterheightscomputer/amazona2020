import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import { myOrderListReducer, orderCreateReducer, orderDetailReducer, orderPayReducer, orderListReducer, orderDeleteReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems") || [];  //fetching of cookie                                  
const userInfo = Cookie.getJSON("userInfo") || null;

const initailState = { cart:{ cartItems, shipping: {}, payment: {} }, userSignin: {userInfo} }; //storing the cookies fetched in cart and userSignin object in the Redux store  
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //its will enable us to view dispatched action in the Redux store on the browser 
const store = createStore(reducer, initailState, composeEnhancer(applyMiddleware(thunk))); // compose(applyMiddleware(thunk) -> its will enable us to dispatch asynchronous function to Redux store in the action.js file instead of dispatch object

export default store;