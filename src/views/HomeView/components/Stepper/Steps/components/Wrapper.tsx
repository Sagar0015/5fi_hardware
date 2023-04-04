import React, { ReactNode } from "react";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";

interface WrapperProps {
  icon?: string;
  title?: string;
  children: ReactNode;
  children2?: ReactNode;
}

const Wrapper = ({ icon, title, children, children2 }: WrapperProps) => {
  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={7}>
          <Stack direction={"row"} spacing={2} margin={"49px 0"}>
            <img src={icon} height="51px" width="50px" alt="tell_us" />
            <Typography
              variant="h1"
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
        </Grid>
        {children2 && (
          <Grid item xs={5}>
            {children2}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Wrapper;
