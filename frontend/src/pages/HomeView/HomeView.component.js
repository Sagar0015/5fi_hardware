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
        <Stepper />
      </HomeBackground>
    </Fragment>
  );
};

export default HomeView;
