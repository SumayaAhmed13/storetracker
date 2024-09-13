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
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../header/utility/utils";
import { useDispatch, useSelector } from "react-redux";
import { addBasketItemAsync } from "../basket/basketSlice";
import StatusCode from "../../header/utility/utils";

const ProductCard = ({ product }) => {

const dispatch=useDispatch();
const {status}=useSelector(state=>state.basket);

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
          loading={status===(StatusCode.LOADING + product.id)}
          onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))}>
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
