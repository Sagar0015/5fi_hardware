import { Box, Container, styled, Typography } from "@mui/material";
import React, { Fragment } from "react";
import Stepper from "./components/Stepper/Stepper";

const HomeBackground = styled("div")({
  background: "#FAFAFC",
});

const HomeView = () => {
  return (
    <Fragment>
      <HomeBackground>
        <Box sx={{ position: "fixed", right: 0, bottom: 0, zIndex: 1 }}>
          <img
            src="images/bg1.svg"
            alt="background"
            style={{ display: "block" }}
          />
        </Box>

        <Stepper />
      </HomeBackground>
    </Fragment>
  );
};

export default HomeView;
