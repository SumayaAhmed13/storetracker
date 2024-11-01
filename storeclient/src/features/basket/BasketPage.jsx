import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BasketTable from "./BasketTable";
import { Typography,Grid, Button } from '@mui/material';
const BasketPage = () => {
 const { basket} = useSelector((state) => state.basket);
  if (!basket)
    return <Typography variant="h3">Your Basket is Empty</Typography>;
  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
            <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
