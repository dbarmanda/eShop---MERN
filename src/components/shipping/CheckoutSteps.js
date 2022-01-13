
import {
  AccountBalanceTwoTone,
  LibraryAddCheckTwoTone,
  LocalShippingTwoTone,
} from "@mui/icons-material";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import React from "react";

import "./checkoutSteps.css"

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingTwoTone />,
    },
    {
      label: <Typography>Confirm Orders</Typography>,
      icon: <LibraryAddCheckTwoTone />,
    },
    {
      label: <Typography>Payment Method</Typography>,
      icon: <AccountBalanceTwoTone />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel 
              icon={item.icon}
              style={{
                color: activeStep >= index ? "rgb(197 12 12)": "rgba(0,0,0.64)",
              }}
            >{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
