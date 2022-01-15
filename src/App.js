import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Cart from "./components/cart/Cart";
import Login from "./components/login/Login";
import Products from "./components/Products/Products";
import ProductDetail from "./components/productDetail/ProductDetail";
import Loader from "./components/loader/Loader";
import Signup from "./components/signup/Signup";
import Profile from "./components/login/Profile";

//Loading user
import { loadUser } from "./state/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

//Protected User(problem: once we reload the page component loads earlier than the state thus throws error.. solution create a protectedRoute )
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Shipping from "./components/shipping/Shipping";
import ConfirmOrder from "./components/shipping/ConfirmOrder";
import axios from "./axios";
import Axios from "axios";
import Payment from "./components/shipping/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/shipping/OrderSuccess"
import MyOrders from "./components/orders/MyOrders";

function App() {


  
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  // //let's get the stripe api key for payment method from our backend
  // const [stripeApiKey, setStripeApiKey] = useState("");
  // const [stripePromise, setStripePromise] = useState('');

  // async function getStripeApiKey() {
  //   const config = {headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
      
  // }};
  //   const { data } = await axios.get("/api/v1/stripeapikey", config);
  //   setStripeApiKey(data.stripeApiKey);
  //   setStripePromise(loadStripe(stripeApiKey));
  // }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, []);
  return (
    <Router>
      <div className="app">
        {/* Going with Routes  */}
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>

          <Route exact path="/checkout" element={ <>  <Navbar /> <Cart /> </> } >

           </Route>

          <Route exact path="/" element={ <> <Navbar /> <Home /> </> }
          ></Route>

          <Route
            exact
            path="/products"
            element={
              <>
                 
                <Navbar /> <Products /> 
              </>
            }
          ></Route>

          <Route path="/products/:keyword" element={ <> <Navbar /> <Products /> </> }
          />

          <Route
            exact
            path="/product/:id"
            element={
              <>
                 
                <Navbar /> <ProductDetail /> 
              </>
            }
          ></Route>

          <Route exact path="/signup" element={<Signup />}></Route>

          {/* ProtectedRoutes handling  */}
          <Route element={<ProtectedRoute />}>
            <Route
              exact
              path="/account"
              element={
                <>
                   
                  <Navbar /> <Profile /> 
                </>
              }
            />
            <Route
              exact
              path="/shipping"
              element={
                <>
                  <Navbar /> <Shipping /> 
                </>
              }
            />

            <Route
              exact
              path="/order/confirm"
              element={
                <>
                  <Navbar /> <ConfirmOrder /> 
                </>
              }
            />

            
                <Route
                  exact
                  path="/process/payment"
                  element={
                    <>
                      <Navbar /> <Payment />
                    </>
                  }
                />

                <Route
                  exact path="/payment/success"
                  element={<> <Navbar/> <OrderSuccess/> </>}
                  />

                <Route
                  exact path="/orders"
                  element={<> <Navbar/> <MyOrders/> </>}
                  />
          </Route>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
