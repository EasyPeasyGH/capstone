import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function ProductForm() {
  // const router = useRouter();

  // const [product, setProduct] = useState({});

  // async function getProduct() {
  //   try {
  //     const res = await fetch(`api/products/${id}`);
  //     if (res.ok) {
  //       console.log("res ok");
  //       const data = await res.json();
  //       setProduct(data);
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // }

  // useEffect(() => {
  //   console.log("useEffect");
  //   getProduct();
  // }, [id]);

  async function handleAddProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const res = await fetch(
      `${process.env.BASE_URL}/api/products/${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    console.log("Add", productData);

    if (res.ok) {
      await res.json();
      event.target.reset();
      router.push("/");
    } else {
      console.error(response.status);
    }
  }

  async function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    console.log("Edit", productData);
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          if (isEditMode === false) {
            handleAddProduct(event);
          } else {
            handleEditProduct(event);
          }
        }}
      >
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            // value={product.name}
            // onChange={(event) => setProduct(event.target.value)}
          />
        </label>
        <label htmlFor="images">
          Images:
          <input
            type="text"
            id="images"
            name="images"
            // value={product.image}
            // onChange={(event) => setProduct(event.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            type="text"
            id="description"
            name="description"
            // value={product.description}
            // onChange={(event) => setProduct(event.target.value)}
          />
        </label>
        <button className="appButton" type="submit">
          Add new
        </button>
      </form>
    </>
  );
}
