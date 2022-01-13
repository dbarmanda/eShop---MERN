import React, {useEffect} from 'react'
import "./profile.css";

import MetaData from '../MetaData';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';

const Profile = () => {

    const {user, loading, isAuthenticated} = useSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login")
        }
    }, [])
    return (

      // <p>Hello brother</p>
        <>
        {loading ? <Loader/> : (
            <>
<MetaData title={`${user.user.name}'s Profile'`}/>
           <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
            </>
        )}
           
        </>
    )
}

export default Profile
