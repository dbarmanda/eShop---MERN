const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter product Name"]
    },
    description: {
        type: String,
        required: [true, "please enter product description"]

    },
    price: {
        type: Number,
        required: [true, "please Enter product price"],
        maxLength: [6, "Price cann't cant excedd 8 figures"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true 
        },
        url: {
            type: String,
            required: true 
        }
    }],

    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        // required: [true, "please Enter Product stock"],
        maxLength: [3, "Stock can't exceed more than 1000"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true 
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Product = mongoose.model('product', productSchema);

module.exports = Product;