const express = require('express');
const router = express.Router();

const Product = require("../models/Product");

//Error Handlers
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require('../utils/apiFeatures');

const {isAuthenticated, authorizeRoles} = require('../middleware/auth')

//1. Create Product
router.post('/admin/product/new',  isAuthenticated,authorizeRoles("admin"),  catchAsyncErrors(async(req, res, next)=>{

    //adding admin USER ID in product before creating
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}))


//2. Get-all Products
router.get("/products" , catchAsyncErrors(async(req, res)=> {
    
    const resultPerPage = 7;


    const productsCount = await Product.countDocuments();
    
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    
    const products = await apiFeature.query;

    // const products = await Product.find();
    
    res.status(200).json({
        success: true,
        products: products,
        productsCount
    });
}));

//3. Get individual product by ID
router.get('/product/:id', catchAsyncErrors(async(req, res, next)=>{

    res.cookie("cokie", "meraCookie");
        const product = await Product.findById(req.params.id);

        if(product === null){
            return res.status(400).json({
                success: false,
                message: 'Invalid Product get request'
            });

            // return next(new ErrorHandler("Invalid Product request...", 404));
        } 
    
         res.status(200).json({
            success: true,
            product,
            
        })

}));


//4. Update Product -- Admin Route
router.put('/admin/product/:id',  isAuthenticated,authorizeRoles("admin"), catchAsyncErrors(async(req, res, next)=>{

   
  //whatever user wants to update update that only (don't ask for everything)
  const {name, description, price, images, stock} = req.body;
  const newProduct={};
  if(name){
      newProduct.name = name;
  } 
  if(description){
      newProduct.description = description;
  } 
  if(price){
      newProduct.price = price;
  } 
  if(images){
      newProduct.images = images;
  } 
  if(stock){
      newProduct.stock = stock;
  } 
  
  let product = await Product.findById(req.params.id);

  if(!product){
      return res.status(400).json({
          sucess: false,
          message: 'product not found'
      })
    // return next(new ErrorHandler("Invalid Product request", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, {$set: newProduct}, {new: true});

  res.status(200).json({
      success: true,
      product
  })
   
  
}));

//5. Delete a Product
router.delete('/admin/product/:id',  isAuthenticated,authorizeRoles("admin"), catchAsyncErrors(async(req, res)=>{

    
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(500).json({
                success: false,
                message: 'invalid request'
            });

            // return next(new ErrorHandler("Invalid Product Request!", 404)); don't know why but bug's there
        } 
        await product.remove();
        res.status(200).json({
            success: true,
            message: 'product deleted successfully',
            product
        })
    
}));



//6. create new review or update the review
router.put('/review',isAuthenticated, 
            catchAsyncErrors(async(req, res, next)=> {


    const { rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    //if product->reviews(array) has this user's comment earlier.. if yes update
    const isReviewed = product.reviews.forEach(
        (rev)=> rev.user.toString() === req.user._id
    );

    if(isReviewed){

        product.reviews.forEach(rev=> {
            if(rev.user.toString() === req.user._id){
                rev.rating = rating;
                rev.comment = comment;
            }
        })

    } else {
        product.reviews.push(review);
        
        product.numOfReviews = product.reviews.length;
    }

    //the overall rating
    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    product.ratings= avg / product.reviews.length;    //returns avg of ratings


    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
        message: "Product review added successfully "
    })
}));

//7. Get all reviews of a Product
router.get("/reviews", catchAsyncErrors(async(req, res, next)=> {

    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
}) )

//8. Delete Review
router.delete("/reviews", isAuthenticated, catchAsyncErrors(async(req, res, next)=>{

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    //Delete
        //filter the review
    const reviews = product.reviews.filter(rev=> rev._id.toString()!==req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    const ratings= avg / reviews.length;    //returns avg of ratings

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    }, {new: true})

    res.status(200).json({
        success: true,
        message: "review Deleted successfully"
    })
}))

module.exports= router;