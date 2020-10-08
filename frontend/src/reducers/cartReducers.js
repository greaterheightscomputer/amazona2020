import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

function cartReducer (state = { cartItems: [], shipping: {}, payment: {} }, action) {

    switch (action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            //Starting of existing product
            const product = state.cartItems.find((pro) => pro.product === item.product); //its indicate that the individual product exist 
            if(product) {//if product exist
                return {
                    cartItems: state.cartItems.map((oldProduct) => oldProduct.product === product.product ? item : oldProduct) //update cartItems: item means if the user select already existing item in the cart then let the newly selected already existing item override the old item because they might be changes in the qty else keep the oldProduct 
                };
            }
            //Ending of existing product
            
            //the newly return state.cartItems base on action 
            return { cartItems : [...state.cartItems, item] } //update cartItems: with ...state.cartItems which mean the previous items + the newly added items
        
        case CART_REMOVE_ITEM:    
            return { cartItems: state.cartItems.filter(item => item.product !== action.payload)};
        
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload} //return new state which consist of previous state (...state) and shipping property 
        
        case CART_SAVE_PAYMENT:
                return {...state, payment: action.payload}
        default: 
            return state
    }
}

export { cartReducer };