import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Product from "../../db/models/Product";
import dbConnect from "../../db/connect";

export async function getServerSideProps({ params }) {
  await dbConnect();
  const data = await Product.findById(params.id);
  const dataAll = await Product.find();
  console.log("data - data - data", data);
  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

export default function ProductDetail({ data, setProductToEdit }) {
  const router = useRouter();
  const { push } = router;

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${data._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("D E L E T E –", data._id);
      await response.json();
      push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  async function handleEditProduct() {
    setProductToEdit(data);
    push("../create/");
  }

  console.log("P R O D U C T", data);

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
          {data.images.map((img, i) => (
            <img
              key={i}
              className="grid__item2"
              src={img}
              alt={`Image ${i + 1} for ${data.name}`}
              width="100%"
            />
          ))}
        </div>
        <div className="grid__item--padding grid__item2">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <p>{`Category: ${data.category}`}</p>
          <p>{`Designer: ${data.designer}`}</p>
          <p>{`Condition: ${data.condition}`}</p>
          <p>{`Dimensions: ${data.dimensions.width} width x ${data.dimensions.depth} depth x ${data.dimensions.height} height`}</p>
          <p>{data.available ? "Available" : "Sold out"}</p>
          <h4>{`${data.price} €`}</h4>
        </div>
        <div className="grid__item--padding grid__itemFull productDetail__editBar">
          <button onClick={() => handleEditProduct()}>Edit</button>
          <button onClick={() => handleDeleteProduct()}> Delete</button>
        </div>
      </section>
      <section className="mainBottomNav">
        <Link href="/">Home</Link>
      </section>
    </>
  );
}
