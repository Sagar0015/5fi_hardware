import React from "react";

import { Container, Grid, Stack, Typography } from "@mui/material";

const Wrapper = ({ icon, title, children }) => {
  return (
    <Container maxWidth={false}>
      <Stack direction={"row"} spacing={2} margin={"49px 0"}>
        <img src={icon} height="51px" width="50px" alt="tell_us" />
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "28px",
            lineHeight: "42px",
            color: "#14395E",
          }}
        >
          {title ?? ""}
        </Typography>
      </Stack>
      {children}
    </Container>
  );
};

export default Wrapper;
