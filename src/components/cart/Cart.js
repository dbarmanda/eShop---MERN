import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";
import ad from "./ad.jpg";
import CheckoutProduct from "../checkout-product/CheckoutProduct";
import Subtotal from "../subtotal/Subtotal";
import { removeItemFromCart } from "../../state/actions/cartAction";
import MetaData from "../MetaData";



function Checkout() {

  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cart);
  console.log(cartItems);

  const removeCartItem = (id)=> {
    dispatch(removeItemFromCart(id));
  }

  return (
<>
<MetaData title="eShoppers - Your eCart is here"/>
    <div className="checkout">
        <div className="checkout_left">
      <img
        className="checkout_ad"
        src="https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/gtx-1650-super/en-strip-banner/geforce-gtx-1650-super-featured-strip-2560-dl@2x.jpg"
        alt=""
      />

    {/* //   {/* {basket.length === 0 ? ( 
    //   {!cartItems ? ( 
        // <div className="checkout_empty">
        //   <img
        //     className="checkout_emptyImage"
        //     src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
        //     alt=""
        //   />
        //   <div className="checkout_emptyInfo">
        //     <h2>Your Eshop Basket is empty</h2>
        //     <small>Shop today's deals</small>
        //   </div>
        // </div>


    //   ) : (*/}
    {cartItems.length === 0 ? (
        <div className="checkout_empty">
          <img
            className="checkout_emptyImage"
            src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
            alt=""
          />
          <div className="checkout_emptyInfo">
            <h2>Your Eshop Basket is empty</h2>
            <small>Shop today's deals</small>
          </div>
        </div>
    ) : (
        <div className="checkout_cart">
          <h2 className="checkout_cartTitle">Your Eshopping Cart</h2>
          {/* Listing all the checkout products i.e. basket items 
          <hr />  */}

          {cartItems.map((item)=>{
              return <CheckoutProduct 
                            deleteCartItem={removeCartItem}
                            key={item.product}
                            id={item.product}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            rating={item.rating}
                            quantity={item.quantity}
                        />;
          })}
        </div> 
    )}
      </div>  
     
    
    {cartItems && (
      <div className="checkout_right">
          <Subtotal/>
      </div>
          )}
   
      </div>
      

          </>
    

    
  );
}

export default Checkout;
