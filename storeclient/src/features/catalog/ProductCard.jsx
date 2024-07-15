import React, { useContext, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardHeader,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import agent from "../../header/api/agent";
import { LoadingButton } from "@mui/lab";
import { StoreContext } from "../../header/context/StoreContext";
import { currencyFormat } from "../../header/utility/utils";
const ProductCard = ({ product }) => {
const [loading, setLoading] = useState(false);
const{setbasket}=useContext(StoreContext)

  const handleAddItem = (productId) => {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket)=>setbasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />

      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.imageUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          loading={loading}
          onClick={() => handleAddItem(product.id)}>
          Add to cart
        </LoadingButton>

        <Button size="small" LinkComponent={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
