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
import agent from "../../header/api/agent";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../header/errors/NotFound";
import Loading from "../../header/layout/Loading";
import { currencyFormat } from "../../header/utility/utils";
import { StoreContext } from "../../header/context/StoreContext";
import { LoadingButton } from "@mui/lab";

const ProductDetails = () => {
  const { basket, setbasket,removeItem } = useContext(StoreContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);

  const handleInputChange=(e)=>{
    if(e.target.value>=0){
      console.log(e.target.value)
      setQuantity(e.target.value)
    }
     
  }
  const handleUpdateCart=()=>{
    setSubmitting(true)
    if(!item || quantity>item?.quantity){
        const updateQty=item?quantity-item.quantity:quantity
          agent.Basket.addItem(product?.id, updateQty)
          .then((basket)=>setbasket(basket))
          .catch(error=>console.log(error))
          .finally(()=>setSubmitting(false))
    }
    else{
      const updateQuantity=item?.quantity - quantity;

      console.log(updateQuantity);
      agent.Basket.removeItem(product?.id,updateQuantity)
      .then(()=>removeItem(product?.id,updateQuantity))
      .catch(error=>console.log(error))
      .finally(()=>setSubmitting(false))
    }
  }
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id &&
      agent.Catalog.details(parseInt(id))
        .then((res) => setProduct(res))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id,item]);
  if (loading) return <Loading message="Loading..." />;
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
              loading={submitting}
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
