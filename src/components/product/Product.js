import React from "react";
import "./product.css";
// import ReactStars from "react-rating-stars-component";

//redux manipulation imports
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import ReactStars from "react-rating-stars-component";

import { Link } from "react-router-dom";

function Product(props) {
  const { id, title, price, rating, image,numOfReviews } = props;

  //manipulating redux state
  // console.log(image.url);

   const addToKart = (e)=>{
    e.preventDefault();
   }


  return (

  
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>

        <div className="product_rating">
        {/* <ReactStars name="half-rating-read" value={rating} precision={0.5} readOnly /> */}
        <ReactStars edit={false} value={rating} isHalf={true} size={window.innerWidth < 600 ? 20: 25} /> <span>{numOfReviews} reviews</span>
        </div>
      </div> 
<Link to={`/product/${id}`}><img className="product_image" src={image} alt="product" /> </Link>
      
      <button onClick={addToKart}>Add to Basket</button>
    </div>
  );
}

export default Product;
