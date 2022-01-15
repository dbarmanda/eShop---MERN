import React,{ useEffect, useRef } from 'react';
import "./payment.css";

import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import MetaData from '../MetaData';

import { 
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import axios from "../../axios";

import {clearErrors, createOrder} from "../../state/actions/orderAction"

import {
     CreditCardOffTwoTone,
     EventTwoTone,
     VpnKeyOffTwoTone
 } from '@mui/icons-material';

const Payment = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);
    const {cartItems, shippingInfo} = useSelector(state => state.cart);
    const {error} = useSelector(state => state.newOrder);

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));


    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
      paymentInfo: {
        id: "atempPayment_id_generated_by_creator",
        status: "succeeded"
      }
    };


    // const payBtn = useRef(null);

    const submitHandler = (e) => {
      e.preventDefault();
      // sessionStorage.setItem()
      // console.log(order);
      dispatch(createOrder(order));
      navigate("/payment/success");

    }

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
    }, [])


    return (
        <>
        <MetaData title="eShoppers - payment gateway" />
        <CheckoutSteps activeStep={2}/>

        <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            < CreditCardOffTwoTone/>
            <input className="paymentInput" />
          </div>
          <div>
            <EventTwoTone />
            <input className="paymentInput" />
          </div>
          <div>
            <VpnKeyOffTwoTone />
            <input className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            onClick={submitHandler}
            className="paymentFormBtn"
          />
        </form>
      </div>
            
        </>
    )
}

export default Payment
