import React, { ReactNode } from "react";
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

interface BtnProps {
  background: string;
  children: ReactNode;
  type?: any;
  sx?: React.CSSProperties;
}

const CustomButton = ({
  background,
  children,
  type = "contained",
  sx,
}: BtnProps) => {
  return (
    <CustomBtn sx={{ backgroundColor: { background }, ...sx }} variant={type}>
      {children ?? ""}
    </CustomBtn>
  );
};

export default CustomButton;
