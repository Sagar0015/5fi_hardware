import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#2C2C6E",
    },
    secondary: {
      main: "#1F3BB3",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
