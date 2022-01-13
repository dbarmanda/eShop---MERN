import { Rating } from '@mui/material';
import React from 'react';
// import { removeFromBasket } from '../../features/basketSlice';
import "./checkoutProduct.css";



function CheckoutProduct(props) {
    const {id, name, price, rating, image, deleteCartItem} = props;

    const removeFromCart = (e)=>{
        e.preventDefault();
        deleteCartItem(id);
    }
    
    return (
        <>
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image} alt="product" />

            <div className="checkoutProduct_info">
                <p className="checkoutProduct_Title">{name}</p>
                <p className="checkoutProduct_price">
                    <small>Rs. </small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct_rating">
                <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                </div>
                <button className="checkout_removeBtn" onClick={removeFromCart}>Remove From Basket</button>
            </div>
            
        </div>
        <hr />
        </>
       
    )
}

export default CheckoutProduct
