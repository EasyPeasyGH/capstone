import Head from "next/head";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { useEffect, useState } from "react";
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

  function showAll(data) {
    setProducts(data);
    push("/");
  }

  function filterFor(data, prop) {
    const filteredProducts = data.filter((p) => p.category === prop);
    setProducts(filteredProducts);
    push("/");
  }

  console.log("I N D E X <--– products", products);
  return (
    <>
      <Head>
        <title>Capstone</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FilterBar />
      <ProductList products={products} />
      <section className="mainBottomNav">
        <Link href="/create">Create</Link>
      </section>
    </>
  );
}
