import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProductForm() {
  const router = useRouter();

  async function handleAddProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    if (productData.available === "on") {
      productData.available = true;
    } else {
      productData.available = false;
    }

    productData.dimensions = {
      width: Number(productData.width),
      depth: Number(productData.depth),
      heigth: Number(productData.height),
    };
    delete productData.width;
    delete productData.depth;
    delete productData.height;

    const res = await fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      await res.json();
      event.target.reset();
      router.push("/");
    } else {
      console.error(res.status);
    }
  }

  // async function handleEditProduct(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const productData = Object.fromEntries(formData);

  //   console.log("Edit", productData);
  // }

  return (
    <>
      <form
        onSubmit={(event) => {
          handleAddProduct(event);
        }}
      >
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue="Name TestObject"
            // value={product.name}
            // onChange={(event) => setProduct(event.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            type="text"
            id="description"
            name="description"
            required
            defaultValue="Desc TestObject"
            // value={product.description}
            // onChange={(event) => setProduct(event.target.value)}
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={9}
            required
          />
        </label>
        <label htmlFor="category">
          Category:
          <input list="category" name="category" defaultValue="Miscellaneous" />
          <datalist id="category">
            <option value="Chair" />
            <option value="Lamp" />
            <option value="Table" />
            <option value="Bowl" />
            <option value="Candlestick" />
            <option value="Miscellaneous" />
          </datalist>
        </label>
        <label htmlFor="designer">
          Designer:
          <input
            type="text"
            id="designer"
            name="designer"
            defaultValue="Hello"
          />
        </label>
        <label htmlFor="condition">
          Condition:
          <input
            type="text"
            id="condition"
            name="condition"
            defaultValue="Good"
          />
        </label>
        <label htmlFor="available">
          Available:
          <input
            type="checkbox"
            id="available"
            name="available"
            defaultValue={true}
          />
        </label>
        <label htmlFor="width">
          Width:
          <input type="number" id="width" name="width" defaultValue={9} />
        </label>
        <label htmlFor="depth">
          Depth:
          <input type="number" id="depth" name="depth" defaultValue={9} />
        </label>
        <label htmlFor="height">
          Height:
          <input type="number" id="height" name="height" defaultValue={9} />
        </label>
        <label htmlFor="images">
          Images:
          <input
            type="file"
            id="images"
            name="images"
            accept="image/png, image/jpeg"
            // value={product.image}
            // onChange={(event) => setProduct(event.target.value)}
            multiple
          />
        </label>
        <button type="submit">Add new product</button>
      </form>
    </>
  );
}
