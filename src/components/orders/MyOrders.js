import React, { useEffect, useState } from "react";
import "./myOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import MetaData from "../MetaData";
import { LaunchRounded } from "@mui/icons-material";

import { clearErrors, myAllOrders } from "../../state/actions/orderAction";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  console.log(orders);

  const rows = [];
  const columns = [
   
    {field: "id",headerName: "Order ID",minWidth: 300,flex: 1},
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      valueGetter: (params)=> {
          return params.getValue(params.row.id, "status") === "Delivered" ? "greenColor": "redColor";
        //   `${params.id}`
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3
    },
    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 150,
        flex: 0.5
    },
    {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params)=> {
            return (
                <Link to={`/order/${params.getValue(params.id), "id"}`}>
                    <LaunchRounded/>
                </Link>
            );
        }  
    }
  ];

  console.log(orders);


  orders && orders.forEach((item)=> {
    rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice
    });
    // console.log(item);
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myAllOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user.user.name}- eshoppers Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            disableEnforceFocus
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
