import React, {useRef, useState, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import "./login.css";
import Loader from "../loader/Loader"

//firebase Google authentication
import {auth} from "./firebase"
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";

import { useNavigate } from "react-router";
import {useDispatch, useSelector} from "react-redux"
import {login, clearErrors} from "../../state/actions/userAction";

import {useAlert} from "react-alert"

import MetaData from "../MetaData";




function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //making alerts
  const alert = useAlert();
 
  console.log("login loaded...")
 
 
  //getting inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('')

  //getting redux-state
  const {error, loading, isAuthenticated} = useSelector(state => state.user)

  //lets make a redirect route using "location.search"
  const redirect = window.location.search ? window.location.search.split("=").at(1): "/account";
  console.log(redirect);

  const loginUser = (e)=> {
    e.preventDefault();   //always in form to prevent refresh

    //login Logic
    dispatch(login(loginEmail, loginPassword));

  };
  
  const loginGoogle = (e)=> {
    e.preventDefault();

    //loginFirebase Google Logic
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res)=> {
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  const register = (e)=> {
    e.preventDefault();
    //register logic
    navigate("/signup")
  }

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }


    if(isAuthenticated){
      navigate(`/${redirect}`);
    }
   
  }, [navigate, isAuthenticated, redirect])
  // }, [dispatch, error,alert, navigate, isAuthenticated])
 


  

  return (

    <>
      { loading ? <Loader/> : (

        <>
          <MetaData title="eShop login"/>
          
        <div className="login_logo">
          <Link to="/" >
          <img
            className="login_logoImg"
            src="https://creativedok.com/content/uploads/2017/05/ESHOPPER.jpg"
            alt=""
          />
          </Link>
          </div>
          <div className="login">
          
            <div className="login_container">
            
              <form className="loginForm" onSubmit={login}>
              <h1>Sign In</h1>
                <h5>E-mail</h5>
                <input type="email" onChange={(e)=> setLoginEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" onChange={(e)=>setLoginPassword(e.target.value)} />

                <button type="submit" className="login_signInBtn" onClick={loginUser}>Sign In</button>
              </form>

              <button className="login_google" onClick={loginGoogle}>Login with Google</button>
              <p>
                By continuing, you agree to Eshoppers's Conditions of Use and
                Privacy Notice. Happy e-shopping 🔥
              </p>
              <h5>Become a E-shopper Today:</h5>
              <button onClick={register} className="login_registerBtn">Create your E-shoppers Account</button>
            </div>
          </div>
        </>
      )}
    </>

 
     )
   }

export default Login;
