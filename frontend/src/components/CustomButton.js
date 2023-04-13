import React from "react";
import { Button, styled } from "@mui/material";

const CustomBtn = styled(Button)({
  borderRadius: "10px",
  fontFamily: "Poppins",
  fontWeight: "normal",
  fontSize: "18px",
  lineHeight: "27px",
  height: "64px",
  minWidth: "180px",
  textTransform: "none",
});

const CustomButton = ({
  background,
  children,
  type = "contained",
  sx,
  onClick
}) => {
  return (
    <CustomBtn sx={{ backgroundColor: { background }, ...sx }} variant={type} onClick={onClick}>
      {children ?? ""}
    </CustomBtn>
  );
};

export default CustomButton;
