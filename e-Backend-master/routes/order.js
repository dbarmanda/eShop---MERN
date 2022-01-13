const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const Product = require('../models/Product'); //for ref

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');


// 1. create/place order
router.post('/order/new', isAuthenticated, catchAsyncErrors(async(req, res, next)=> {

    const {shippingInfo, orderItems, paymentInfo
        ,taxPrice, shippingPrice, totalPrice, itemsPrice} = req.body;

    
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo
        ,taxPrice, shippingPrice, totalPrice, itemsPrice,
        paidAt: Date.now(),
        user: req.user._id
    })


    res.status(200).json({
        success: true,
        order,
    })
}))


// 2. get order Info:
router.get('/order/:id', isAuthenticated,  catchAsyncErrors(async(req, res, next)=> {

    /* const order = await Order.findById(req.params.id).populate(
        "user",     
         "name email"   
        );      ---> What this basically does - reads the objectId "user" in DB & from that id's details
                populate name & email stored inside that user(id)
    */            
 const order = await Order.findById(req.params.id);
//  .populate(
//         "user",    
//          "name"   
//         );

    if(!order){
        return next(new ErrorHandler("order not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
}));


// 3. get Logged in user Orders--> the most used 
router.get('/orders/myOrders', isAuthenticated, catchAsyncErrors(async(req, res, next)=> {

                    // ek order ke andar ke user ki id
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    })
}));

// 4. Get all orders - Admin
router.get('/admin/orders', isAuthenticated, authorizeRoles("admin"), 
    catchAsyncErrors(async(req, res, next)=>{

        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order)=> {
            totalAmount+= order.totalPrice;
        })

        // orders.totalPrice = totalAmount;

        res.status(200).json({
            success: true,
            orders,
            totalAmount
        })
    }));

// 5. update order Status
router.put('/admin/order/:id', isAuthenticated, authorizeRoles("admin"), 
    catchAsyncErrors(async(req, res, next)=>{

        const order = await Order.findById(req.params.id);

        if(order.orderStatus === "Delievered"){
            return next(new ErrorHandler("You have already delieverd this order", 404));
        }

        //to update quantity of products in stock
        order.orderItems.forEach(async(order)=>{
            await updateStock(order.product, order.quantity);
        });


        order.orderStatus = req.body.status;

        if(req.body.status === "Delivered"){

            order.deliveredAt = Date.now();
        }


        await order.save({validateBeforeSave: false});

        res.status(200).json({
            success: true,
            
        })
    }));


async function updateStock(id, quantity){

    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave: false});
}


//6. Delete Order - Admin
router.delete('/admin/order/:id', isAuthenticated, authorizeRoles("admin"), 
    catchAsyncErrors(async(req, res, next)=>{

        const order = await Order.findById(req.params.id);

        if(!order){
            return next(new ErrorHandler("Order not found with this id", 404))
        }
        await order.remove();
        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })
}));


module.exports = router;