import agent from "../../header/api/agent";
import Loading from "../../header/layout/Loading";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Catalog.list()
    .then((products) => setProducts(products))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false));
  }, []);
  if (loading) return <Loading message="Loading..." />;
  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
      },
    ]);
  };
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
