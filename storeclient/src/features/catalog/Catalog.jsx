import { useDispatch, useSelector } from "react-redux";

import Loading from "../../header/layout/Loading";
import ProductList from "./ProductList";
import { useEffect} from "react";
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import StatusCode from "../../header/utility/utils";
const Catalog = () => {
  const products=useSelector(productSelectors.selectAll)
  const dispatch=useDispatch();
  const {productLoaded,status}=useSelector((state)=>state.catelog)
 
  useEffect(() => {
    if(!productLoaded)dispatch(fetchProductsAsync())
  }, [dispatch,productLoaded]);
  if (status===StatusCode.LOADING) return <Loading message="Loading..." />;
  
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
