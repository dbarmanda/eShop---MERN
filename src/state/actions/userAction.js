import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConsts";

import axios from "../../axios";

//post request action
//1. login user
export const login = (email, password) => async(dispatch)=>{
    try {

        dispatch({type: LOGIN_REQUEST});

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         }
        // };
        const config = {headers: {"Content-Type": "application/json",
        
        }};

        const {data} = await axios.post(
                `/api/v1/login`,
                {email, password},
                config,
               
        );

        // console.log(data);
        localStorage.setItem('token', data.token);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });           
        
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
    }
};


//2. create/register user
export const register = (userData) => async(dispatch)=>{
    try {

        // console.log(userData)

         dispatch({type: REGISTER_USER_REQUEST});

         const config = {headers: {"Content-Type": "application/json",
         "Access-Control-Allow-Origin": "*",
        }};

         const {data} = await axios.post(`/api/v1/register`,userData, config);

        //  console.log(data);
        localStorage.setItem("token", data.token);

         dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
        
    } catch (error) {
        dispatch({type: REGISTER_USER_FAIL, payload: error.response.data.message});
    }
};

// Loading User
export const loadUser = () => async(dispatch)=>{
    try {

        dispatch({type: LOAD_USER_REQUEST});

        const config = {headers: {
            "Content-Type": "application/json",
            'token': localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
            
        }};
        // console.log("heelo");
        // console.log(localStorage.getItem('token'));


        // let data = {};

        const {data} = await axios.get(`/api/v1/profile`,config);
        // const data = localStorage.getItem('token');
        // const data = await axios({method: 'GET', url: `/api/v1/profile` ,withCredentials: true})

        // await axios.get(`/api/v1/profile`, {withCredentials: true}).then((response)=>{
        //     console.log(response);
        //     data = response.data;
        // });


        dispatch({type: LOAD_USER_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message})
    }
}


// 3. LOGOUT USER
export const logout = () => async(dispatch)=>{
    try {
        // localStorage.setItem('token', null);
        
        await axios.get(`/api/v1/logout`);


        dispatch({
            type: LOGOUT_SUCCESS,
        });           
        
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
    }
};


// clearing errors
export const clearErrors = () => async(dispatch)=> {
    dispatch({
        type: CLEAR_ERRORS
    });
};