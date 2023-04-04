import React from "react";
import {
  AppBar,
  Container,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { IoNotifications } from "react-icons/io5";
import { IoEarth } from "react-icons/io5";
import { TbChevronDown } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";

const NavbarContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
});

const Topbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <NavbarContent>
          <Box>
            <img
              src="/images/5-fi_logo.svg"
              alt="5-fi"
              height="40.85px"
              width="73px"
            />
          </Box>
          <Box sx={{ display: "flex", gap: "40px" }}>
            <IconButton>
              {/* <IoNotifications color="#fff" /> */}
              <img src="/images/alert.svg" alt="notification" />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src="/images/globe.svg" alt="globe" />

              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "16px",
                  lineHeight: "19px",
                  paddingLeft: "12px",
                }}
              >
                English
              </Typography>

              <IconButton>
                <TbChevronDown color="#fff" size={"1rem"} />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <FaUserAlt fontSize={"1.4rem"} /> */}
              <img src="/images/user.svg" alt="user" />

              <IconButton>
                <TbChevronDown color="#fff" size={"1rem"} />
              </IconButton>
            </Box>
          </Box>
        </NavbarContent>
      </Container>
    </AppBar>
  );
};

export default Topbar;
