import Head from "next/head";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import Product from "../db/models/Product";
import dbConnect from "../db/connect";
import { useRouter } from "next/router";
import Search from "../components/Search";

export async function getServerSideProps() {
  await dbConnect();
  const data = await Product.find();
  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

export default function Home({ data, search, toggleSearch, basket }) {
  const [products, setProducts] = useState(data);
  const router = useRouter();
  const { push } = router;

  function showAll() {
    console.log("<--- Show A L L");
    setProducts(data);
  }

  function filterFor(prop) {
    console.log("<--- Filter F O R", prop);
    const filteredProducts = data.filter((p) => p.category.includes(prop));
    if (filteredProducts) {
      setProducts(filteredProducts);
    } else {
      push("/404");
    }
  }

  function searchFor(prop) {
    console.log("<--- Search F O R", prop);
    const filteredProducts = data.filter(
      (p) =>
        p.category.toLowerCase().includes(prop) ||
        p.name.toLowerCase().includes(prop) ||
        p.description.toLowerCase().includes(prop) ||
        p.designer.toLowerCase().includes(prop) ||
        p.hasOwnProperty(prop)
    );
    if (filteredProducts) {
      setProducts(filteredProducts);
    } else {
      push("/404");
    }
  }

  console.log("I N D E X", data);
  return (
    <>
      <Head>
        <title>Capstone</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search
        search={search}
        searchFor={searchFor}
        toggleSearch={toggleSearch}
      />
      <FilterBar data={data} showAll={showAll} filterFor={filterFor} />
      <ProductList products={products} basket={basket} />
    </>
  );
}
