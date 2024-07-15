import React, { useContext, useState } from "react";
import {
  IconButton,
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
import { StoreContext } from "../../header/context/StoreContext";
import agent from "../../header/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../header/utility/utils";
import { Link } from "react-router-dom";

const BasketPage = () => {
  const { basket, setbasket, removeItem } = useContext(StoreContext);
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });
  const handleAddItem = (productId, name) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setbasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  };
  const handleRemoveItem = (productId, quantity, name) => {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId))
      .finally(() => setStatus({ loading: false, name: "" }));
  };
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
                    loading={
                      status.loading && status.name === "rem" + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        1,
                        "rem" + item.productId
                      )
                    }
                    color="error">
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      status.loading && status.name === "add" + item.productId
                    }
                    onClick={() =>
                      handleAddItem(item.productId, "add" + item.productId)
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
                    loading={
                      status.loading && status.name === "del" + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      )
                    }
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
