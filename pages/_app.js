import "../styles/globals.css";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [productToEdit, setProductToEdit] = useState();
  const [basket, setBasket] = useState([]);
  const [amount, setAmount] = useState([]);
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
        basket={basket}
        setBasket={setBasket}
        search={search}
        toggleSearch={toggleSearch}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        amount={amount}
        setAmount={setAmount}
        {...pageProps}
      />
    </Layout>
  );
}
