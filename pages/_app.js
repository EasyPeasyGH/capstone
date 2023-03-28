import "../styles/globals.css";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [products, setProducts] = useState({});
  const [productToEdit, setProductToEdit] = useState();
  const [search, setSearch] = useState(false);

  function toggleSearch(state) {
    if (state) {
      document.getElementById("search").focus();
    }
    setSearch(state);
  }

  return (
    <Layout search={search} toggleSearch={toggleSearch}>
      <Component
        search={search}
        toggleSearch={toggleSearch}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        products={products}
        setProducts={setProducts}
        {...pageProps}
      />
    </Layout>
  );
}
