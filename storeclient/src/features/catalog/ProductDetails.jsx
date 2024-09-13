import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../header/errors/NotFound";
import Loading from "../../header/layout/Loading";
import StatusCode, { currencyFormat } from "../../header/utility/utils";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { addBasketItemAsync,removeBasketItemAsync } from './../basket/basketSlice';
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
 
  const dispatch=useDispatch();
  const {basket,status}=useSelector(state=>state.basket);
  const {state:productStatus}=useSelector(state=>state.catelog)
  const { id } = useParams();
  const product=useSelector(state=>productSelectors.selectById(state,id))
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);
 

  const handleInputChange=(e)=>{
    if(e.target.value>=0){
      console.log(e.target.value)
      setQuantity(e.target.value)
    }
     
  }
  const handleUpdateCart=()=>{
   
    if(!item || quantity>item?.quantity){
        const updateQty=item?quantity-item.quantity:quantity
        dispatch(addBasketItemAsync({ productId:product?.id,quantity: updateQty}))
     }
    else{
      const updateQuantity=item?.quantity - quantity;
      dispatch(removeBasketItemAsync({ productId:product?.id, quantity:updateQuantity}))
     }
  }
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if(!product && id)dispatch(fetchProductAsync(parseInt(id)))
  }, [id,item,product,dispatch]);
  if (productStatus===StatusCode.LOADING) return <Loading message="Loading..." />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody sx={{ fontSize: "1.1em" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.stockInQuantity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
             disabled={item?.quantity===quantity ||!item && quantity===0}
              variant="contained"
              color="primary"
              xs={{height: "95px" }}
              size="large"
              fullWidth
              loading={status===(StatusCode.LOADING +product.productId)}
              onClick={handleUpdateCart}
              >
              {item ? "Update Quantity" : "Add Quantity"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
