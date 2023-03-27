import Head from "next/head";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import Product from "../db/models/Product";
import dbConnect from "../db/connect";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  await dbConnect();

  const data = await Product.find();
  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

export default function Home({ data }) {
  const [products, setProducts] = useState(data);
  const router = useRouter();
  const { push } = router;

  function showAll() {
    console.log("<--- show A L L");
    setProducts(data);
  }

  function filterFor(prop) {
    console.log("<--- filter F O R", prop);
    const filteredProducts = data.filter((p) => p.category.includes(prop));
    if (filteredProducts) {
      setProducts(filteredProducts);
    } else {
      push("/404");
    }
  }

  console.log("I N D E X");
  return (
    <>
      <Head>
        <title>Capstone</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FilterBar data={data} showAll={showAll} filterFor={filterFor} />
      <ProductList products={products} />
      <section className="mainBottomNav">
        <Link href="/create">Create</Link>
      </section>
    </>
  );
}
