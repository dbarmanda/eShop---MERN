import React, { useEffect, useState } from "react";
import "./productDetail.css";

import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import Carousel from "react-material-ui-carousel";
import Products from "../Products/Products";
import Product from "../product/Product";
import MetaData from "../MetaData";
import ReviewCard from "../review-card/Review";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../state/actions/productAction";
import Loader from "../loader/Loader";

//for error
import { useAlert } from "react-alert"
import {addItemsToCart} from "../../state/actions/cartAction"



function ProductDetail() {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false)
  //alert
  const alert = useAlert();
/********************************* */
  const { id } = useParams();


  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );


  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    size: 22,
    value: product.rating,
    edit: false,
    isHalf: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {
    console.log("hello adding to cart");
    dispatch(addItemsToCart(id, quantity));
    alert.success("Product added to your e-Cart")


  };

  const decreaseQuantity = () => {
    if(1 >= quantity) return ;
    const qty = quantity -1;
    setQuantity(qty);
  };
  const increaseQuantity = () => {
    if(product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const submitReviewToggle = () => {};

  return (
   <>
    {
      loading?<Loader/> : (
        <>
        <MetaData title={`${product.name} -- eShoppers`} />
        <div className="productDetails">
          <div className="productImage">
            <Carousel>
              
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="carouselImage"
                    src={item.url}
                    key={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`Rs. ${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
  
              <p>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
  
            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>
  
            <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
            </button>
          </div>
        </div>
  
        <h3 className="reviewsHeading">REVIEWS</h3>
  
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            
  
            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
             
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            
          </DialogActions>
        </Dialog>
  
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
                // <p>{review.comment}</p>
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </>
      )
    }
   </>
  );
}

export default ProductDetail;
