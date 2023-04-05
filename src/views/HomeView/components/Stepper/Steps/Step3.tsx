import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CustomButton from "../../../../../components/CustomButton";
import Wrapper from "./components/Wrapper";

import DirectionsIcon from "@mui/icons-material/Directions";

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

      <Box>
        <Stack direction={"row"} spacing={4}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={
                <InputAdornment position="end" sx={{ background: "#111" }}>
                  <img
                    src="/images/search.svg"
                    height="27px"
                    width="27px"
                    alt="Search"
                  />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>

          <CustomButton background="#1F3BB3" sx={{ borderRadius: "20px" }}>
            Browse catalog
          </CustomButton>
        </Stack>
      </Box>

      <Box>
        <Typography>Bill Details</Typography>
      </Box>
    </Wrapper>
  );
};

export default Step3;
