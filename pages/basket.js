import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BasketProduct from "../components/BasketProduct";

export default function Basket({ basket, setBasket }) {
  let [total, setTotal] = useState(0);
  const router = useRouter();
  const { push } = router;

  // async function setAvailableDatabase() {
  //   data.available = !data.available;
  //   console.log("A V A I L A B L E", data.available);

  //   const response = await fetch(`/api/products/${data._id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (response.ok) {
  //     await response.json();
  //     router.push("/basket");
  //   } else {
  //     console.error(`Error: ${response.status}`);
  //   }
  // }

  basket.map((b) => {
    total = total + b.price;
  });

  console.log("B A S K E T", basket);
  return (
    <>
      <Head>
        <title>Capstone - Basket</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        id="basket"
        className="grid"
        onSubmit={(event) => {
          event.preventDefault();
          // handleSubmit(event);
        }}
      >
        <fieldset className="grid__itemFull grid">
          <ul className="grid__itemFull grid">
            {basket.map((p, i) => {
              return (
                <li key={p._id} className="product grid__itemFull grid">
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
        </fieldset>
        <fieldset className="grid__itemFull grid">
          <label className="grid__itemBasket">Add a note to your order:</label>
          <textarea
            className="grid__itemBasket3"
            type="text"
            name="orderNote"
            id="orderNote"
          />
        </fieldset>
        <fieldset className="grid__itemFull grid">
          <p className="grid__itemBasket2 grid__item--padding cc">
            Tax included and shipping calculated at checkout
          </p>
          <h4 className="grid__itemBasket grid__item--padding">{`Subtotal:`}</h4>
          <h4 className="grid__itemBasket grid__item--padding">{`${total} €`}</h4>
        </fieldset>
        <fieldset className="grid__itemFull cc">
          <button type="submit">Check out</button>
        </fieldset>
      </form>
    </>
  );
}
