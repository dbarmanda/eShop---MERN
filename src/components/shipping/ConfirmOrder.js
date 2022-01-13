import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../MetaData";
import { useSelector } from "react-redux";
import "./confirmOrder.css";
import { Link , useNavigate} from "react-router-dom";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
    const navigate = useNavigate();
  //get info & cart items from redux-state(in localstorage)
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);


  //subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price, 0
)

    //either 200 or no
    const shippingCharges = subtotal > 1000 ? 0 : 200 ;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.pinCode},${shippingInfo.country}`;

    const proceedToPayment = () => {

        const data = {
            subtotal,
            tax,
            shippingCharges,
            tax,
            totalPrice,
        };

        //session-storage - deletes data when you close the tab brother
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment")
    };

  return (
    <>
      <MetaData title="eShoppers - Confirm Order page" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
