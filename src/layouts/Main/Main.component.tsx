import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Topbar from "./components/Topbar";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <Box sx={{ height: "100%" }}>
      <Topbar />
      <main>{children}</main>
    </Box>
  );
};

export default Main;
