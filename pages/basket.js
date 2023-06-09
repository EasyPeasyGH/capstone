import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BasketProduct from "../components/BasketProduct";
import Script from "next/script";
import confetti from "https://cdn.skypack.dev/canvas-confetti";

export default function Basket({
  basket,
  setBasket,
  amount,
  setAmount,
  order,
  setOrder,
}) {
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
    amount.splice(index, 1);
    setAmount((amount) => [...amount]);
  }

  function calculatePrice(id, index, productAmount) {
    // console.log(basket.map((p) => p._id.includes(id)));
    // console.log(amount.map((a) => a._id.includes(id)));
    // console.log("basket[index].price", basket[index].price);
    // console.log("productAmount", productAmount);
    return Number(basket[index].price * productAmount);
  }

  async function updateProductPrice(id, index, productAmount) {
    // console.log("id", id, "index", index);
    amount[index].price = await calculatePrice(id, index, productAmount);
    console.log("amount[index].price", amount[index].price);
    setAmount((amount) => {
      return [...amount];
    });
  }

  amount.map((a) => {
    total = total + a.price;
  });

  if (basket.length > 0) {
    setOrder(false);
  }

  // - - - - -

  function party() {
    confetti();
  }

  // var count = 200;
  // var defaults = {
  //   origin: { y: 0.7 },
  // };

  // function fire(particleRatio, opts) {
  //   confetti(
  //     Object.assign({}, defaults, opts, {
  //       particleCount: Math.floor(count * particleRatio),
  //     })
  //   );
  // }

  // fire(0.25, {
  //   spread: 26,
  //   startVelocity: 55,
  // });
  // fire(0.2, {
  //   spread: 60,
  // });
  // fire(0.35, {
  //   spread: 100,
  //   decay: 0.91,
  //   scalar: 0.8,
  // });
  // fire(0.1, {
  //   spread: 120,
  //   startVelocity: 25,
  //   decay: 0.92,
  //   scalar: 1.2,
  // });
  // fire(0.1, {
  //   spread: 120,
  //   startVelocity: 45,
  // });

  // - - - - -

  console.log("B A S K E T", amount);
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
          const formData = new FormData(event.target);
          const basketData = Object.fromEntries(formData);
          console.log(basketData);
          if (basket.length > 0) {
            setOrder(!order);
          }
          setBasket([]);
          setAmount([]);
          event.target.reset();
          party();
        }}
      >
        <fieldset className="grid__itemFull grid">
          {order ? (
            <>
              <h2 className="grid__itemFull grid__item--padding gcc">
                Thank you for your order.
                <br /> We will take care of it lovingly!
              </h2>
            </>
          ) : (
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
                      amountPrice={amount[i].price}
                      category={p.category}
                      designer={p.designer}
                      condition={p.condition}
                      dimensions={p.dimensions}
                      images={p.images}
                      currency={currency}
                      handleRemoveProduct={handleRemoveProduct}
                      updateProductPrice={updateProductPrice}
                    />
                  </li>
                );
              })}
            </ul>
          )}
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
          <div className="grid__itemBasket14">
            <label>
              <h4>{`Subtotal:`}</h4>
            </label>
          </div>
          <div className="grid__itemBasket13">
            <label htmlFor="currency">
              <input
                type="text"
                id="currency"
                name="currency"
                value={currency[1]}
                readOnly
              />
            </label>
          </div>
          <div className="grid__itemBasket23">
            <label htmlFor="total">
              <input
                type="text"
                id="total"
                name="total"
                value={total}
                readOnly
              />
            </label>
          </div>
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
