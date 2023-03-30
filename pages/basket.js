import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BasketProduct from "../components/BasketProduct";

export default function Basket({ basket, setBasket }) {
  let [total, setTotal] = useState(0);
  const router = useRouter();
  const { push } = router;
  const currency = ["$", "€", "£", "¥"];

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

  async function handleRemoveProduct(event, id, index) {
    console.log("R E M O V E");
    console.log("id", id, "index", index);
    console.log(basket.map((p) => p._id.includes(id)));
    basket.splice(index, 1);
    setBasket((basket) => [...basket]);
  }

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
      <section className="grid basketInfo">
        <h4 className="grid__itemBasket grid__item--padding outline">Image</h4>
        <h4 className="grid__itemBasket2 grid__item--padding">Info</h4>
        <h4 className="grid__itemBasket13 grid__item--padding">Currency</h4>
        <h4 className="grid__itemBasket23 grid__item--padding">Price</h4>
      </section>
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
                    index={i}
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
                    currency={currency}
                    handleRemoveProduct={handleRemoveProduct}
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
          <h4 className="grid__itemBasket14 grid__item--padding">{`Subtotal:`}</h4>
          <h4 className="grid__itemBasket13 grid__item--padding">
            {currency[1]}
          </h4>
          <h4 className="grid__itemBasket23 grid__item--padding">{total}</h4>
          <p className="grid__itemBasket312 grid__item--padding gcc">
            Tax included and shipping calculated at checkout
          </p>
        </fieldset>
        <fieldset className="grid__itemFull cc">
          <button type="submit">Check out</button>
        </fieldset>
      </form>
    </>
  );
}
