import React, { useEffect } from 'react'
import "./products.css"
import bannerImg from "./banner.jpg"
import Product from '../product/Product'
import MetaData from '../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../state/actions/productAction';
import Loader from '../loader/Loader';

import { useAlert } from 'react-alert';

function Products() {

    const alert = useAlert();

    const dispatch = useDispatch();
    
    const {loading, error, products, productsCount} = useSelector(
        (state)=>state.products
    )

    // console.log(products)
    // console.log(products)
    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors);
          }


       dispatch(getProducts());
    }, [dispatch, error])

    return (
        <>
        {
            loading ? (<Loader/>) : (

                 <div className="products">
            <MetaData title="eShop- All Products"/>
            <img src={bannerImg} alt="" className="products_Img" />

            <div className="products_row">

                {products && products.map(product=>(

                    <Product
                    key={product._id}
                    
                 id={product._id}
                 title={product.name}
                 price={product.price}
                 image={product.images}
                 rating={product.rating}
                 numOfReviews={product.numOfReviews}
                // title="NVIDIA Quadro RTX 5000 16GB GDDR6 Graphic Card (VCQRTX5000-PB)"
                // price={999}
                // rating={4.3}
                // image="https://images-eu.ssl-images-amazon.com/images/I/51tNJFJe27L._SX300_SY300_QL70_FMwebp_.jpg"
                />
                ))}
            </div>
        </div>

            )
        }
       
        </>
    )
}

export default Products
