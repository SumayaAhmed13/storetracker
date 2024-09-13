
import {

  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableBody,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import StatusCode, { currencyFormat } from "../../header/utility/utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addBasketItemAsync,removeBasketItemAsync } from "./basketSlice";
const BasketPage = () => {
 const dispatch=useDispatch();
 const {basket,status}=useSelector(state=>state.basket)
 if (!basket)
    return <Typography variant="h3">Your Basket is Empty</Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />

                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status===StatusCode.LOADING + item.productId + 'rem'}
                    onClick={() =>dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity,name:'rem'}))}
                    color="error">
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    
                    loading={status===StatusCode.LOADING + item.productId}
                    onClick={() =>
                      dispatch(addBasketItemAsync({productId:item.productId,quantity:1}))
                    }
                    color="secondary">
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                      loading={status===StatusCode.LOADING + item.productId +'del'}
                      onClick={() =>dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity,name:'del'}))}
                    color="error">
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={6}>
          <BasketSummary/>
          
          <Button component={Link} to='/checkout'variant='contained'size="large" fullWidth>
             Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
