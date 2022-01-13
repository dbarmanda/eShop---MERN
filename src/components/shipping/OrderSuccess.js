import React from "react";
import "./orderSuccess.css";
import { Link } from "react-router-dom";

import { CheckCircleTwoTone } from "@mui/icons-material";
import { Typography } from "@mui/material";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleTwoTone />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
