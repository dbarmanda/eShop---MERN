import React, { useEffect, useState } from 'react'
import "./products.css"
import bannerImg from "./banner.jpg"
import Product from '../product/Product'
import MetaData from '../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../state/actions/productAction';
import Loader from '../loader/Loader';

import { useAlert } from 'react-alert';
//for search & pagination..
import {useParams } from "react-router-dom"; 
import Pagination from "react-js-pagination";


function Products() {

    const alert = useAlert();

    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const {loading, error, products, productsCount, resultPerPage} = useSelector(
        (state)=>state.products
    )

    const setCurrentPageNo = (e)=> {
        setCurrentPage(e);
    }


    //for searching option
    const {keyword} = useParams();
    console.log(products);


    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors);
          }


       dispatch(getProducts(keyword, currentPage));
    }, [dispatch, error, keyword,currentPage])

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
                 image={product.images[0].url}
                 rating={product.rating}
                 numOfReviews={product.numOfReviews}
                // title="NVIDIA Quadro RTX 5000 16GB GDDR6 Graphic Card (VCQRTX5000-PB)"
                // price={999}
                // rating={4.3}
                // image="https://images-eu.ssl-images-amazon.com/images/I/51tNJFJe27L._SX300_SY300_QL70_FMwebp_.jpg"
                />
                ))}
            </div>
{resultPerPage < productsCount && (
    <div className="paginationBox">
    <Pagination
        activePage={currentPage}
        itemsCountPerPage={resultPerPage}
        totalItemsCount={productsCount}
        onChange={setCurrentPageNo}
        nextPageText="Next"
        prevPageText="Prev"
        firstPageText="1st"
        lastPageText="Last"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
    />
</div>
) }
            
        </div>

            )
        }
       
        </>
    )
}

export default Products
