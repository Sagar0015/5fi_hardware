import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { IoAddCircleOutline } from "react-icons/io5";

import Wrapper from "./components/Wrapper";

const ContentTitle = styled("h3")({
  fontFamily: "Poppins",
  fontWeight: "normal",
  fontSize: "22px",
  lineHeight: "33px",
  letterSpacing: "0px",
  color: "#030303",
  marginBottom: "10px",
});

const CustomBox = styled("div")({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "0.5px solid #B1AFAF",
  borderRadius: "10px",
  padding: "1.5rem 1.875rem",
  height: "100%",
});

const Step1 = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Wrapper
      icon="/images/tell_us.svg"
      title="Tell us more about your facility"
    >
      <Grid container spacing={4}>
        <Grid container item xs={12}>
          <Grid item xs={7}>
            <CustomBox>
              <Box>
                <ContentTitle>Type of facility</ContentTitle>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    disableUnderline={true}
                    displayEmpty
                    sx={{
                      borderRadius: "16px",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "18px",
                      lineHeight: "27px",
                      color: "#030303",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #D6D7DB !important",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ marginTop: "3.1875rem" }}>
                <ContentTitle>Square footage</ContentTitle>

                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Box flex={"75%"}>
                    <TextField
                      fullWidth
                      label=""
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "16px",
                          background: "#FFFFFF 0% 0% no-repeat padding-box",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "18px",
                          lineHeight: "27px",
                          color: "#030303",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid #D6D7DB !important",
                        },
                      }}
                    />
                  </Box>
                  <Box flex={"25%"}>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        value={age}
                        onChange={handleChange}
                        disableUnderline={true}
                        displayEmpty
                        sx={{
                          borderRadius: "16px",
                          background: "#FFFFFF 0% 0% no-repeat padding-box",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "18px",
                          lineHeight: "27px",
                          color: "#030303",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #D6D7DB !important",
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </CustomBox>
          </Grid>
          <Grid item xs={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <ContentTitle>(or)</ContentTitle>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <CustomBox
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ContentTitle>Upload the floor plan</ContentTitle>
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
                }}
              >
                <IoAddCircleOutline color="#fff" fontSize={"1.5rem"} /> Add
                files
              </Button>
            </CustomBox>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <CustomBox>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <ContentTitle>Number of devices</ContentTitle>
                <TextField
                  fullWidth
                  label=""
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "16px",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "18px",
                      lineHeight: "27px",
                      color: "#030303",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid #D6D7DB !important",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <ContentTitle>Choice of spectrum</ContentTitle>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    disableUnderline={true}
                    displayEmpty
                    sx={{
                      borderRadius: "16px",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "18px",
                      lineHeight: "27px",
                      color: "#030303",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #D6D7DB !important",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CustomBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Step1;
