import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BasketProduct from "../components/BasketProduct";

export default function Basket({ basket, setBasket }) {
  const router = useRouter();
  const { push } = router;

  async function setAvailable() {
    data.available = !data.available;
    console.log("A V A I L A B L E", data.available);

    const response = await fetch(`/api/products/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await response.json();
      router.push("/basket");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  console.log("B A S K E T", basket);
  return (
    <>
      <Head>
        <title>Capstone - Basket</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className="grid">
        {basket.map((p, i) => {
          return (
            <li key={p._id} className="grid__item outline">
              <BasketProduct
                key={i}
                id={p._id}
                name={p.name}
                description={p.description}
                available={p.available}
                price={p.price}
                category={p.category}
                designer={p.designer}
                condition={p.condition}
                dimensions={p.dimensions}
                images={p.images}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
