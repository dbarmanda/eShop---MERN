import React,{ useState } from "react";
import "./product.css";
// import ReactStars from "react-rating-stars-component";

//redux manipulation imports
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import ReactStars from "react-rating-stars-component";

import { Link } from "react-router-dom";
import { addItemsToCart } from "../../state/actions/cartAction";

function Product(props) {
  const dispatch = useDispatch();
  const { id, title, price, rating, image,numOfReviews } = props;

 
  const [quantity, setQuantity] = useState(1);

   const addToKart = (e)=>{
    e.preventDefault();
    dispatch(addItemsToCart(id, quantity));
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
        <ReactStars edit={false} value={rating} isHalf={true} size={window.innerWidth < 600 ? 20: 25} /> <span>{numOfReviews} reviews</span>
        </div>
      </div> 
<Link to={`/product/${id}`}><img className="product_image" src={image} alt="product" /> </Link>
      
      <button onClick={addToKart}>Add to Basket</button>
    </div>
  );
}

export default Product;
