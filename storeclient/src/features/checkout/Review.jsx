import { Typography, Grid } from "@mui/material";
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/BasketSummary";
import { useSelector } from "react-redux";

const Review = () => {
  const { basket } = useSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false} />}

      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
};
export default Review;
