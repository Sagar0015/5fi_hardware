import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import CustomButton from "../../../../../components/CustomButton";
import Wrapper from "./components/Wrapper";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import search from '../../../../../images/images/search.svg'
import deleteSvg from '../../../../../images/images/delete.svg'
import mail from '../../../../../images/images/mail.svg'
import shopping from '../../../../../images/images/shopping.svg'
import customer from '../../../../../images/images/customer.svg'



const MainWrapper = styled("div")(({ theme }) => ({
  backgroundImage: "url(images/bg1.svg)",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundPosition: "right bottom",
  [theme.breakpoints.down("md")]: {
    backgroundImage: "none",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme: any }) => ({
  border: "1px solid #DDDDE2",
  "& > MuiTableBody-root": {
    borderBottom: "3px solid #DDDDE2",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F4F4F5",
    color: "#020202",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: "30px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: "30px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const data = [
  {
    id: 1,
    productDetails: "5-Fi Access point",
    qty: 1,
    availability: "Immediate",
    unitPrice: "$2800",
    price: "$2800",
  },
  {
    id: 2,
    productDetails: "5-Fi SIM cards",
    qty: 1,
    availability: "Immediate",
    unitPrice: "$10",
    price: "$10",
  },
];

const Step3 = ({ setActiveStep }) => {
  return (
    <MainWrapper>
      <Wrapper icon={shopping} title="Shopping Cart">
        <Grid container spacing={6}>
          <Grid item xs={8}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 24,
                  lineHeight: "35px",
                  color: "#14395E",
                }}
              >
                Order #237890
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "normal",
                  fontSize: 24,
                  lineHeight: "35px",
                  color: "#030303",
                }}
              >
                14 Dec 2022 at 11:22 am
              </Typography>
            </Box>

            <Divider sx={{ border: "2px solid #DDDDE2", margin: "21px 0" }} />

            <Stack direction={"row"} spacing={4}>
              <CustomButton background="#E97C61" sx={{ borderRadius: "20px" }}>
                Unpaid
              </CustomButton>
              <CustomButton background="#E8AB4D" sx={{ borderRadius: "20px" }}>
                Unfulfilled
              </CustomButton>
            </Stack>

            <Box m={"60px 0 34px 0"}>
              <Stack direction={"row"} spacing={4}>
                <TextField
                  placeholder="Search"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingLeft: 0,
                      paddingRight: 0,
                      borderRadius: "20px",
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      lineHeight: "34px",
                      fontWeight: "normal",
                      fontStyle: "normal",
                      color: "#CACACA",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{
                          padding: "30px",
                          backgroundColor: "#1F3BB3",
                          borderRadius: "20px",
                        }}
                        position="end"
                      >
                        <img src={search} alt="search" />
                      </InputAdornment>
                    ),
                  }}
                />

                <CustomButton
                  background="#1F3BB3"
                  sx={{ borderRadius: "20px" }}
                >
                  Browse catalog
                </CustomButton>
              </Stack>

              <Box mt="35px">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell>Product details</StyledTableCell>
                        <StyledTableCell>Quantity</StyledTableCell>
                        <StyledTableCell>Availability</StyledTableCell>
                        <StyledTableCell>Unit price</StyledTableCell>
                        <StyledTableCell>Price</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((d) => (
                        <StyledTableRow key={d.id}>
                          <StyledTableCell component="th" scope="row">
                            {d.id}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {d.productDetails}
                          </StyledTableCell>
                          <StyledTableCell>{d.qty}</StyledTableCell>
                          <StyledTableCell>{d.availability}</StyledTableCell>
                          <StyledTableCell>{d.unitPrice}</StyledTableCell>
                          <StyledTableCell>{d.price}</StyledTableCell>
                          <StyledTableCell align="center">
                            <img src={deleteSvg} alt="del" />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>

            <Box mt={"30px"}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: 24,
                  lineHeight: "35px",
                  color: "#14395E",
                  marginBottom: "20px",
                }}
              >
                Bill Details
              </Typography>

              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box flex={1}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "medium",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#14395E",
                      }}
                    >
                      Sub total:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "medium",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#14395E",
                      }}
                    >
                      $2800
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "medium",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#14395E",
                      }}
                    >
                      Shipping:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "medium",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#14395E",
                      }}
                    >
                      $40
                    </Typography>
                  </Stack>
                </Box>
                <Box flex={1} />
                <Stack flex={1} spacing={4}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#14395E",
                      }}
                    >
                      Total:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#14395E",
                      }}
                    >
                      $2800
                    </Typography>
                  </Stack>
                  <CustomButton
                    background="#1F3BB3"
                    onClick={() => setActiveStep(3)}
                  >
                    Proceed to buy
                  </CustomButton>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Box
              sx={{
                zIndex: 2,
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                width: "438px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: 24,
                  lineHeight: "35px",
                  color: "#14395E",
                }}
              >
                Customer details
              </Typography>
              <Box
                sx={{
                  background: "background: #FFFFFF 0% 0% no-repeat padding-box",
                  padding: "29px 37px",
                  marginTop: "24px",
                  maxWidth: "438px",
                  width: "100%",
                }}
              >
                <Box>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <img src={customer} alt="customer" />
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: "600",
                          fontSize: 24,
                          lineHeight: "35px",
                          color: "#14395E",
                        }}
                      >
                        John Doe
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: "normal",
                          fontSize: 24,
                          lineHeight: "35px",
                          color: "#14395E",
                        }}
                      >
                        <strong>10</strong> previous orders
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider
                    sx={{ border: "3px solid #DDDDE2", margin: "20px 0" }}
                  />

                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <img src={mail} alt="mail" />
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#14395E",
                      }}
                    >
                      jhohndoe@gmail.com
                    </Typography>
                  </Stack>

                  <Divider
                    sx={{ border: "3px solid #DDDDE2", margin: "20px 0" }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "600",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#030303",
                        paddingBottom: "10px",
                      }}
                    >
                      Shipping address
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      Cheyenne Korsgaard
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      Santa Ana, Illinois
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      85486
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      The United States of America
                    </Typography>
                  </Box>

                  <Divider
                    sx={{ border: "3px solid #DDDDE2", margin: "20px 0" }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "600",
                        fontSize: 24,
                        lineHeight: "35px",
                        color: "#030303",
                        paddingBottom: "10px",
                      }}
                    >
                      Billing address
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      Cheyenne Korsgaard
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      Santa Ana, Illinois
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      85486
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "normal",
                        fontSize: 20,
                        lineHeight: "30px",
                        color: "#0C0C0C",
                      }}
                    >
                      The United States of America
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
    </MainWrapper>
  );
};

export default Step3;
