import React from 'react';
import ReactStars from 'react-rating-stars-component';
import profile1 from "./profile-12.jpg"
import "./review.css"

function Review(props) {

    const {review } = props;

    
    return (
        <div className="reviewCard">
            <div className="userImg">
            <img src={profile1} alt="User" />

            </div>
            <p>{review.name}</p>
            <ReactStars edit={false} value={review.rating} isHalf={true} size={window.innerWidth < 600 ? 20: 25} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    )
}

export default Review
