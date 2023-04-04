import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../../../../../components/CustomButton";
import Wrapper from "./components/Wrapper";

const Step2 = () => {
  return (
    <Wrapper icon="/images/suggested.svg" title="Suggested 5-Fi network layout">
      <Box>
        <TextField
          fullWidth
          variant="filled"
          label=""
          InputProps={{ disableUnderline: true }}
          sx={{
            display: "flex",
            alignItems: "center",
            "& .MuiInputBase-root": {
              borderRadius: "16px",
              background: "#D6D7DB 0% 0% no-repeat padding-box",
              fontFamily: "Poppins, sans-serif",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "22px",
              lineHeight: "33px",
              color: "#030303",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid #D6D7DB !important",
            },
          }}
          value={"Number of Access points required is 3."}
        />

        <Button
          variant="contained"
          sx={{
            maxWidth: "235px",
            width: "100%",
            background: "#1F3BB3 0% 0% no-repeat padding-box",
            borderRadius: "10px",
            fontFamily: "Poppins, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "27px",
            color: "#fff",
            textTransform: "none",
            padding: "18px",
            margin: "22px 0 37px 0",
          }}
        >
          Order now
        </Button>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "normal",
            fontSize: "22px",
            lineHeight: "33px",
            marginBottom: "21px",
          }}
        >
          Select the device types that you use in your facility
        </Typography>

        <Stack direction={"row"} spacing={"13px"}>
          <CustomButton background="#397FF4">Camera</CustomButton>
          <CustomButton background="#397FF4">Sensors</CustomButton>
          <CustomButton background="#397FF4">AGV's</CustomButton>
          <CustomButton background="#FFFFFF" type="outlined">
            Actuators
          </CustomButton>
          <CustomButton background="#FFFFFF" type="outlined">
            Others
          </CustomButton>
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default Step2;
