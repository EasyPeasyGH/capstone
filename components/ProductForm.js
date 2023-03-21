import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { headers } from "../next.config";

export default function ProductForm({ productToEdit, setProductToEdit }) {
  const router = useRouter();

  const [previewFileSource, setPreviewFileSource] = useState("");

  function previewFile(event) {
    const files = event.target.files;
    console.log(`files`, files);
    const filesFromReader = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`file`, file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        filesFromReader.push(reader.result);
      };
    }
    console.log("filesFromReader", filesFromReader);
    setPreviewFileSource(filesFromReader);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // if (!previewFileSource) return;
    // try {
    //   await fetch("/api/products", {
    //     method: "POST",
    //     body: JSON.stringify({ data: previewFileSource }),
    //     headers: { "Content-type": "application/json" },
    //     // { Authorization: "Basic" + Buffer.from(process.env.CLOUDKEY +  ":" + process.env.CLOUDSECRET).toString("base64")},
    //   });
    // } catch {
    //   console.error("Error", error);
    // }

    const fileInput = Array.from(event.target.elements).find(
      ({ name }) => name === "images"
    );
    console.log(fileInput);

    const formData = new FormData(event.target);

    console.log("formData", formData);

    for (const file of fileInput.files) {
      console.log("file", file);
      formData.append("file", file);
    }

    const productData = Object.fromEntries(formData);

    if (productData.available === "on") {
      productData.available = true;
    } else {
      productData.available = false;
    }

    productData.dimensions = {
      width: Number(productData.width),
      depth: Number(productData.depth),
      height: Number(productData.height),
    };
    delete productData.width;
    delete productData.depth;
    delete productData.height;

    if (productToEdit) {
      console.log("productToEdit_id", productToEdit._id);
      const response = await fetch(`/api/products/${productToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await response.json();
        event.target.reset();
        router.push("/");
      } else {
        console.error(`Error: ${response.status}`);
      }
      setProductToEdit();
    } else {
      console.log("Create N E W");
      const response = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await response.json();
        event.target.reset();
        router.push("/");
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
  }

  // async function handleEditProduct(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const productData = Object.fromEntries(formData);

  //   console.log("Edit", productData);
  // }

  console.log("previewFileSource", previewFileSource);
  return (
    <>
      <form
        className="grid"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label className="grid__itemFull" htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={
              productToEdit ? productToEdit.name : "Name TestObject"
            }
          />
        </label>

        <label className="grid__itemFull" htmlFor="description">
          Description:
          <textarea
            type="text"
            id="description"
            name="description"
            required
            defaultValue={
              productToEdit
                ? productToEdit.description
                : "Description TestObject"
            }
          />
        </label>

        <label className="grid__itemFull" htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={productToEdit ? productToEdit.price : 9}
            required
          />
        </label>

        <label className="grid__itemFull" htmlFor="category">
          Category:
          <input
            list="category"
            name="category"
            defaultValue={
              productToEdit ? productToEdit.category : "Miscellaneous"
            }
          />
          <datalist id="category">
            <option value="Chair" />
            <option value="Lamp" />
            <option value="Table" />
            <option value="Bowl" />
            <option value="Candlestick" />
            <option value="Miscellaneous" />
          </datalist>
        </label>

        <label className="grid__itemFull" htmlFor="designer">
          Designer:
          <input
            type="text"
            id="designer"
            name="designer"
            defaultValue={productToEdit ? productToEdit.designer : "Designer"}
          />
        </label>

        <label className="grid__itemFull" htmlFor="condition">
          Condition:
          <input
            type="text"
            id="condition"
            name="condition"
            defaultValue={
              productToEdit ? productToEdit.condition : "Good condition"
            }
          />
        </label>

        <label className="grid__itemFull" htmlFor="available">
          Available:
          <input
            type="checkbox"
            id="available"
            name="available"
            defaultChecked={productToEdit ? productToEdit.available : true}
          />
        </label>

        <label className="grid__itemFull" htmlFor="width">
          Width:
          <input
            type="number"
            id="width"
            name="width"
            defaultValue={productToEdit ? productToEdit.dimensions.width : 9}
          />
        </label>

        <label className="grid__itemFull" htmlFor="depth">
          Depth:
          <input
            type="number"
            id="depth"
            name="depth"
            defaultValue={productToEdit ? productToEdit.dimensions.depth : 9}
          />
        </label>

        <label className="grid__itemFull" htmlFor="height">
          Height:
          <input
            type="number"
            id="height"
            name="height"
            defaultValue={productToEdit ? productToEdit.dimensions.height : 9}
          />
        </label>

        <label className="grid__itemFull" htmlFor="images">
          Images:
          <input
            type="file"
            id="images"
            name="images"
            accept="image/png, image/jpeg, image/webp"
            multiple
            onChange={previewFile}
          />
        </label>

        {previewFileSource && (
          <>
            {previewFileSource.map((file, i) => (
              <img
                key={i}
                src={file}
                alt={`Selected image ${file}`}
                className="grid__item grid__item--padding"
              />
            ))}
            <p>{previewFileSource.length}</p>
            <img
              src={previewFileSource[0]}
              alt={`Selected image ${previewFileSource[0]}`}
              className="grid__item grid__item--padding"
            />
          </>
        )}

        <button className="grid__item2" type="submit">
          {productToEdit ? "Edit product" : "Create product"}
        </button>
      </form>
    </>
  );
}
