import { useDispatch, useSelector } from "react-redux";
import Loading from "../../header/layout/Loading";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {fetchProductsAsync,productSelectors,fetchFiltersAsync,setProductParams,setPageNumber} from "./catalogSlice";
import {Grid,Paper} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import CheckboxButtons from "../../components/CheckboxButtons";
import CatelogPagination from "../../components/CatelogPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];
const Catalog = () => {
  const products = useSelector(productSelectors.selectAll);
  const dispatch = useDispatch();
  const { productLoaded, filtersLoaded, brands, types, productParams,metaData } =
    useSelector((state) => state.catelog);

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductsAsync());
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, productLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <Loading message="Loading..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={productParams.orderBy}
            onChange={(event) =>
              dispatch(setProductParams({ orderBy: event.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items) => dispatch(setProductParams({ brands: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{mb:2}}>
        {metaData &&
        <CatelogPagination metaData={metaData} 
         onPageChange={(page) => dispatch(setPageNumber({pageNumber: page}))}  />
        }
         
      </Grid>
    </Grid>
  );
};

export default Catalog;
