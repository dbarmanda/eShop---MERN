import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "./logo1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

//material ui
import Backdrop from '@mui/material/Backdrop';
import SearchIcon from "@mui/icons-material/Search";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FlagIcon from "@mui/icons-material/Flag";
import { useSelector, useDispatch } from "react-redux";

//for logged in user
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAlert } from "react-alert";

import {loadUser, logout} from "../../state/actions/userAction";
import { useParams } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const {cartItems} = useSelector(state => state.cart)

  
  const dashboard = (e) => {
    // e.preventDefault();
    navigate("/dashboard");
  };

  const orders = (e) => {
    // e.preventDefault();
    console.log("hello");
    navigate("/orders");
  };

  const logoutH = (e) => {
    // e.preventDefault();
    localStorage.setItem('token', null);
    dispatch(logout());
    
    alert.success("Logout Successfully");
  };

  const profile = (e) => {
    // e.preventDefault();
    navigate("/account");
  };

  const [open, setOpen] = useState(false);
  const options = [
    { icon: <WidgetsIcon />, name: "Orders", func: orders },
    { icon: <AccountBoxIcon />, name: "Profile", func: profile },
    { icon: <LogoutIcon />, name: "Logout", func: logoutH },
  ];

  const handleOpen = () => setOpen(!open);


  useEffect(() => {

    try {
      if (user.user.role === "admin") {
        options.unshift({
          icon: <AdminPanelSettingsIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
    } catch (error) {
      console.log(error.message);
    }

  }, [])
      
    
  

  const searchSubmitHandler = (e) => {
    // console.log(keyword);
    e.preventDefault();
    if(keyword.trim()){
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
<>
    {!loading && (
      <nav className="navbar">
      {/* logo  */}
      <Link className="logo" to="/">
        <img className="navbar_logo" src={logo} alt="" />
      </Link>

      {/* search box */}
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search your e-products here..."
          onChange={(e) => setKeyword(e.target.value)}
          className="navbar_searchInput"
        />
        <SearchIcon
          onClick={searchSubmitHandler}
          className="navbar_searchIcon"
        />
      </div>

      {/* 3 icon links + kart */}
      <div className="navbar_nav">
        <div className="navbar_link">
          <div className="navbar_flag">
            <FlagIcon />
          </div>
        </div>

        <Link className="navbar_link" to={isAuthenticated ? "/account" : "/login"}>
          <div className="navbar_option">
            <span className="navbar_optionOne">Hello,</span>
            <span className="navbar_optionTwo">
              {isAuthenticated ? user.user.name : "Sign In"}
            </span>
          </div>
        </Link>

        <Link className="navbar_link" to="/">
          <div className="navbar_option">
            <span className="navbar_optionOne">Returns</span>
            <span className="navbar_optionTwo">& Orders</span>
          </div>
        </Link>

        <Link className="navbar_link" to="/products">
          <div className="navbar_option">
            <span className="navbar_optionOne">All</span>
            <span className="navbar_optionTwo">Products</span>
          </div>
        </Link>
      </div>

      {/* Basket icon (state inside ) */}
      <Link className="navbar_link" to="/checkout">
        <div className="navbar_optionBasket">
          {/* shopping icon  */}
          <LocalGroceryStoreIcon className="navbar_kart" />
          {/* no.of items in basket  */}
          <span className="navbar_optionTwo navbar_basketCount">{cartItems.length}</span>
        </div>
      </Link>

      {
        isAuthenticated && (
          <div className="navbar_link">
            <Backdrop open={open}/>
 <SpeedDial
            className="navbar_link"
            id={user.user.role=== "admin"? "speedDialAdmin" : "speedDial"}
            ariaLabel="SpeedDial basic example"
            // sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<MenuOpenIcon />}
            direction="down"
            onClick={handleOpen}
          open={open}
          >

 {options.map((item)=>(
          <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true: false}
            ></SpeedDialAction>
        ))} 


          </SpeedDial>
          </div>
         
        )
     
      }
    </nav>
    )}
    </>

   
  );
}

export default Navbar;
