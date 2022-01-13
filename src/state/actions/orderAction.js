import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_FAIL,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_REQUEST,
  CLEAR_ERRORS
} from "../constants/orderConsts";


import axios from "../../axios";


//Create Order & store in localstorage
export const createOrder = (order) => async(dispatch, getState)=> {

    try {

        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'token': localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
            }
        }

        // console.log("order action")
        const {data} = await axios.post("/api/v1/order/new", order, config);
        // console.log(data);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}


//get all orders - users
export const myAllOrders = () => async(dispatch, getState)=> {

    try {

        dispatch({
            type: MY_ORDERS_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'token': localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
            }
        }
    
        // console.log("order action")
        const {data} = await axios.get("/api/v1//orders/myOrders",config);
        // console.log(data);

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders,
        })
        
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const clearErrors = () => async(dispatch)=> {
    dispatch({
        type: CLEAR_ERRORS
    })
}