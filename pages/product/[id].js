import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Product from "../../db/models/Product";
import dbConnect from "../../db/connect";
import { useEffect, useState } from "react";

export async function getServerSideProps({ params }) {
  await dbConnect();
  const data = await Product.findById(params.id);
  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

export default function ProductDetail({
  data,
  setProductToEdit,
  basket,
  setBasket,
  amount,
  setAmount,
}) {
  const [product, setProduct] = useState(data);
  const router = useRouter();
  const { push } = router;

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${product._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("D E L E T E –", product._id);
      await response.json();
      push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  function handleEditProduct() {
    setProductToEdit(product);
    push("../create/");
  }

  function addProductToBasket() {
    product.available = !product.available;
    console.log("product.available", product.available);
    setBasket((basket) => [...basket, { ...product }]);
    setAmount((amount) => [...amount, { ...product }]);
  }

  console.log("basket", typeof basket, basket, basket.length);
  console.log("amount", typeof amount, amount, amount.length);

  basket.map((b) => {
    if (b._id.includes(product._id)) {
      product.available = false;
    }
  });

  return (
    <>
      <Head>
        <title>Capstone - Product</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="grid outline">
        <div className="grid__item2 productDetail__imgBox">
          {product.images.map((img, i) => (
            <img
              key={i}
              className="grid__item2"
              src={img}
              alt={`Image ${i + 1} for ${product.name}`}
              width="100%"
            />
          ))}
        </div>
        <div className="grid__item--padding grid__item2">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{`Category: ${product.category}`}</p>
          <p>{`Designer: ${product.designer}`}</p>
          <p>{`Condition: ${product.condition}`}</p>
          <p>{`Dimensions: ${product.dimensions.width} width x ${product.dimensions.depth} depth x ${product.dimensions.height} height`}</p>
          <p>{product.available ? "Available" : "Sold out"}</p>
          <h4
            className={product.available ? "" : "unavailable"}
          >{`${product.price} €`}</h4>
          <section className="gcc">
            {product.available ? (
              <button onClick={() => addProductToBasket()}>
                Add to Basket
              </button>
            ) : (
              <button className={product.available ? "" : "unavailable"}>
                Product sold out
              </button>
            )}
          </section>
        </div>
        <div className="grid__item--padding grid__itemFull productDetail__editBar">
          <button onClick={() => handleEditProduct()}>Edit</button>
          <button onClick={() => handleDeleteProduct()}> Delete</button>
        </div>
      </section>
    </>
  );
}
