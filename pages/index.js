import Head from "next/head";
import ProductList from "../components/ProductList";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
// import Product from "../db/models/Product";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/products`);
  const data = await res.json();
  // const pro = await Product.find();
  // console.log("pro - pro - pro - pro - pro", pro);
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  const [products, setProducts] = useState([]);
  // setProducts(data);

  useEffect(() => {
    console.log("Index.js – useEffect triggered");
    setProducts(data);
  }, [data]);

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
