import React, { useEffect, useState } from "react";
import agent from "../../header/api/agent";
import Loading from "../../header/layout/Loading";
import { IconButton, Table, TableCell, TableContainer, TableHead, TableRow, Typography,Paper,TableBody } from "@mui/material";
import { Delete } from "@mui/icons-material";

const BasketPage = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState(null);
  useEffect(() => {
    agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  console.log(basket);
  if (loading) return <Loading message="Loading Busket...." />;
  if (!basket)
    return <Typography variant="h3">Your Basket is Empty</Typography>;
  return (
    <TableContainer component={Paper}>
      
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">SubTotal</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {basket.items.map(item => (
          <TableRow
            key={item.productId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
            <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">${((item.price/100) * item.quantity).toFixed(2)}</TableCell>
            <TableCell align="right">
              <IconButton color="error">
                <Delete/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
};

export default BasketPage;
