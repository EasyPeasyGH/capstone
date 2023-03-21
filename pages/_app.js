import "../styles/globals.css";
import Layout from "../components/Layout";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [productToEdit, setProductToEdit] = useState();

  return (
    <Layout>
      <Component
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        {...pageProps}
      />
    </Layout>
  );
}
