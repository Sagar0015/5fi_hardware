import React from "react";

import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import scan_QR_big from '../../../../../images/images/scan_QR_big.svg'
import location from '../../../../../images/images/location.svg'
import connect from '../../../../../images/images/connect.svg'


const Step4 = () => {
  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 40px",
        }}
      >
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "56px",
              lineHeight: "85px",
              color: "#14395E",
            }}
          >
            Your order is complete.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "normal",
              fontSize: "30px",
              lineHeight: "46px",
              color: "#030303",
            }}
          >
            You will receive the order by 12 April. Once you receive the order,
            follow these 3 steps to deploy the access point.
          </Typography>
        </Box>

        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            border: "1px solid #707070",
            margin: "0 60px",
          }}
        />

        <Stack sx={{ flex: 1 }} gap={"78px"}>
          <Box display={"flex"} gap={"30px"} alignItems={"center"}>
            <img
              src={scan_QR_big}
              height={"212px"}
              width={"176px"}
              alt="QR"
              style={{ flex: "20%" }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "46px",
                lineHeight: "69px",
                letterSpacing: "0px",
                color: "#030303",
                flex: "80%",
              }}
            >
              1. Scan QR Code on the AP
            </Typography>
          </Box>
          <Box display={"flex"} gap={"30px"} alignItems={"center"}>
            <img
              src={location}
              height={"104px"}
              width={"104px"}
              alt="QR"
              style={{ flex: "20%" }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "46px",
                lineHeight: "69px",
                letterSpacing: "0px",
                color: "#030303",
                flex: "80%",
              }}
            >
              2. Place the AP at given location
            </Typography>
          </Box>
          <Box display={"flex"} gap={"30px"} alignItems={"center"}>
            <img
              src={connect}
              height={"90px"}
              width={"90px"}
              alt="QR"
              style={{ flex: "20%" }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "46px",
                lineHeight: "69px",
                letterSpacing: "0px",
                color: "#030303",
                flex: "80%",
              }}
            >
              3. Connect Power and Internet to the AP
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Step4;
