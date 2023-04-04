import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../../../../../components/CustomButton";
import Wrapper from "./components/Wrapper";

const Step3 = () => {
  return (
    <Wrapper icon="/images/shopping.svg" title="Shopping Cart">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography>Order #237890</Typography>
        <Typography>14 Dec 2022 at 11:22 am</Typography>
      </Box>

      <Divider sx={{ border: "2px solid #DDDDE2", margin: "21px 0" }} />

      <Stack direction={"row"} spacing={4}>
        <CustomButton background="#E97C61" sx={{ borderRadius: "20px" }}>
          Unpaid
        </CustomButton>
        <CustomButton background="#E8AB4D" sx={{ borderRadius: "20px" }}>
          Unfulfilled
        </CustomButton>
      </Stack>

      <h2>Table</h2>

      <Box>
        <Typography>Bill Details</Typography>
      </Box>
    </Wrapper>
  );
};

export default Step3;
