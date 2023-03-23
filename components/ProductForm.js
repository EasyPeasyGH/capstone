import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { headers } from "../next.config";

export default function ProductForm({ productToEdit, setProductToEdit }) {
  const router = useRouter();

  const [previewFileSource, setPreviewFileSource] = useState("");

  function handlePreview(event) {
    console.log("event 1", event);
    const files = event.target.files;
    const filesFromReader = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (event) => {
        console.log("event 2", event);
        console.log(`P R E V I E W`, reader.result);
        filesFromReader.push(reader.result);
      };
    }
    setPreviewFileSource(filesFromReader);
  }

  async function handleImagesUpload(formImages) {
    const urlImages = [];
    if (formImages.length > 0) {
      const fileFormData = new FormData();
      for (let i = 0; i < formImages.length; i++) {
        const file = formImages[i];
        fileFormData.append("file", file);
        fileFormData.append("upload_preset", "mog5j9qy");
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/dhvjdtncn/image/upload",
          {
            method: "POST",
            body: fileFormData,
          }
        ).then((r) => r.json());
        urlImages.push(data.secure_url);
      }
    } else {
      urlImages.push("product_placeholder_image.jpg");
    }
    return urlImages;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    productData.images = await handleImagesUpload(event.target.images.files);

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
      console.log("E D I T", productToEdit._id);
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
      console.log("C R E A T E");
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
            onChange={(event) => {
              handlePreview(event);
            }}
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
            {/* <img
              src={previewFileSource[0]}
              alt={`Selected image ${previewFileSource[0]}`}
              className="grid__item grid__item--padding"
            /> */}
          </>
        )}

        <button className="grid__item2" type="submit">
          {productToEdit ? "Edit product" : "Create product"}
        </button>
      </form>
    </>
  );
}
