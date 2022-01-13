import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from '../login/Login';
import Profile from '../login/Profile';
import { Outlet } from 'react-router';
import Loader from '../loader/Loader';

const ProtectedRoute = () => {

    const {loading, isAuthenticated} = useSelector(state => state.user);

    // const navigate = useNavigate();
    
    return loading? <Loader/> : (isAuthenticated ? <Outlet/> : <Login/>);
        
       //set true of false directly to check absolutenesssssss 11: 42:29
    
}

export default ProtectedRoute;
