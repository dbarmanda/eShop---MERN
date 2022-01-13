import React, {useRef, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "./signup.css";
import { useNavigate } from "react-router";

import Loader from "../loader/Loader";

import {clearErrors, register} from "../../state/actions/userAction";

import img from "./Profile.png"

function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {loading, user, isAuthenticated} = useSelector(state => state.user)

    const [userT, setUserT] = useState({
        name: "",
        email: "",
        password: "",
    })

    console.log("2");

    // const {name, email, password} = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(img);

    const registerUser = (e)=> {
      e.preventDefault();   //always in form to prevent refresh
      
      const newUser = {
        name: userT.name,
        email: userT.email,
        password: userT.password
      };

      dispatch(register(newUser));
      // navigate('/account');

      console.log("1")

      };

      //*** we need file reader for this action (input is file) */
     
     
      
     
      const registerDataChange = (e) => {
        if(e.target.value === "avatar") {

            const reader = new FileReader();
            reader.onload = () => {     //0 initial 1 processing 2 finished
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUserT({...userT, [e.target.name]: e.target.value})
        }
      }

      useEffect(() => {
        if(isAuthenticated === true){   // ---> might solve the problem
          navigate("/account")
        }
      }, [isAuthenticated])
    return (
      <>
    
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
            
               <form className="loginForm"  >
               <h1>Sign Up</h1>
                 <h5>Name</h5>
                 <input type="text" name="name" required onChange={(e)=> setUserT({...userT, [e.target.name]: e.target.value})}/>
                 {/* <input type="text" required onChange={registerDataChange}/> */}
                 <h5>Email</h5>
                 <input type="email" name="email" onChange={(e)=> setUserT({...userT, [e.target.name]: e.target.value})} required />
                 <h5>Password</h5>
                 <input type="password" name="password" required onChange={(e)=> setUserT({...userT, [e.target.name]: e.target.value})}/>
                 <h5>Confirm-Password</h5>
                 <input type="password" required onChange={(e)=> setUserT({...userT, [e.target.name]: e.target.value})}/>
 
                 {/* <h5>Select profile Image</h5>
                 <div className="registerImage">
                     <img src="" alt="" />
                     <input 
                         type="file" 
                         name="avatar"
                         accept="image/*"
                         onChange={registerDataChange}
                         />
 
                 </div> */}
     
                 <button type="submit" className="login_signInBtn" onClick={registerUser}>Register Account</button>
               </form>
     
               
             </div>
           </div>
         </>
      )}
     
export default Signup;
