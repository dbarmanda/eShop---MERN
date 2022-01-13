import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./state/reducers/cartReducer";

//middlewares

  import {productsReducer, productDetailsReducer} from "./state/reducers/productReducer";
import { userReducer } from "./state/reducers/userReducer";
import {myOrdersReducer, newOrderReducer} from "./state/reducers/orderReducer"

export default function configureAppStore() {


  const preloadedState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
          : [] ,

      shippingInfo: localStorage.getItem("shippingInfo") ?
      JSON.parse(localStorage.getItem("cartItems")) :
      {}
    }
  }

  const store = configureStore({
    reducer: {
        products: productsReducer,  //the name in redux store
        productDetails: productDetailsReducer,
        user: userReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        myOrders: myOrdersReducer,
    },    
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware(),
    preloadedState,
    //.concate to add middlewares
    
  });

  return store;
}
