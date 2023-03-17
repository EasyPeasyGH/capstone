import Head from "next/head";
import ProductList from "../components/ProductList";
import { useState } from "react";
// import { useEffect } from "react";
import Link from "next/link";
import Product from "../db/models/Product";

export async function getServerSideProps() {
  const data = await Product.find();
  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

export default function Home({ data }) {
  const [products, setProducts] = useState(data);

  // useEffect(() => {
  //   console.log("Index.js – useEffect triggered");
  //   setProducts(data);
  // }, [data]);

  console.log("Index.js – products", products);
  return (
    <>
      <Head>
        <title>Capstone</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList products={products} />
      <section className="mainBottomNav">
        <Link href="/create">Create</Link>
      </section>
    </>
  );
}
