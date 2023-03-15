import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

// export async function getStaticPaths() {
//   try {
//     const res = await fetch(`api/products/${id}`);
//     if (res.ok) {
//       const data = await res.json();
//       console.log("res.ok data is", data);
//     }
//   } catch (error) {
//     console.error("Error: ", error);
//   }

//   const paths = data.map((p) => {
//     return {
//       params: { id: p._id.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${params.id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function ProductDetail({ data }) {
  // const router = useRouter();
  // const { id } = router.query;
  // const { push } = useRouter();
  // const [product, setProduct] = useState({});

  // setProduct(data);

  // async function fetchProduct() {
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
  //   console.log("useEffect triggered");
  //   setProduct(data);
  // }, [data]);

  // async function handleDeleteProduct(id) {
  //   const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
  //   if (response.ok) {
  //     console.log("delete pressed + response OK", id);
  //     await response.json();
  //     push("/");
  //   } else {
  //     console.error(`Error: ${response.status}`);
  //   }
  // }

  // async function handleEditProduct(id) {
  //   console.log("Clicked Edit for ID", id);
  //   push("../create/");
  // }

  // console.log(id);
  // console.log("[id].js ", data);
  // console.log("[id].js Product fetched before return()", product);
  // console.log("[id].js Images", product.images[0]);
  return (
    <>
      <Head>
        <title>Capstone - Product</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="productDetail">
        <img src={data.images[0]} alt={`Image for ${data.name}`} width="100%" />
        <div className="productDetail__info">
          <h3>{data.name}</h3>

          <p>{data.description}</p>
        </div>
        <div>
          <button onClick={() => handleEditProduct(id)}>Edit</button>
          <button onClick={() => handleDeleteProduct(id)}> Delete</button>
        </div>
      </section>
      <Link href="/">Home</Link>
    </>
  );
}
