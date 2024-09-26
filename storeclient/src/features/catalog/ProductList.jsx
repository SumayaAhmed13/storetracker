import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import ProductCardSkeleton from "./ProductCardSkeleton";
const ProductList = ({ products }) => {
  const { productLoaded } = useSelector((state) => state.catelog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} item xs={4}>
          {!productLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
