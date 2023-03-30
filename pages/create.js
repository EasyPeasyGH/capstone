import Head from "next/head";

import ProductForm from "../components/ProductForm";
import Link from "next/link";

export default function Create({ productToEdit, setProductToEdit }) {
  return (
    <>
      <Head>
        <title>Capstone - Create</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductForm
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
      />
    </>
  );
}
