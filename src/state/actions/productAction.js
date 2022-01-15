// import axios from "axios";
import axios from "../../axios";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
} from "../constants/productConsts";



export const getProducts = (keyword="", currentPage=1) => async(dispatch)=> {

    try {

        //dispacth the action
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })
        // console.log("hello")
        //fetches data from our backend
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
        
        const {data } = await axios.get(link);
        
        
     
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            })
            
        

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const getProductDetails = (id) => async(dispatch)=> {

    try {
        // console.log(id);

        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
       
        const {data} = await axios.get(`/api/v1/product/${id}`);
     
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product,
            })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
};


// clearing errors
export const clearErrors = () => async(dispatch)=> {
    dispatch({
        type: CLEAR_ERRORS
    });
}