import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { headers } from "../next.config";

export default function ProductForm({ productToEdit, setProductToEdit }) {
  const router = useRouter();

  const [previewFileSource, setPreviewFileSource] = useState(
    productToEdit ? productToEdit.images : ""
  );

  function handlePreview() {
    const files = document.getElementById("images").files;
    if (files.length === 0) {
      console.log("E M P T Y");
      setPreviewFileSource("");
    } else {
      console.log("P R E V I E W", files.length);
      const filesFromReader = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = (event) => {
          filesFromReader.push(event.target.result);
          setPreviewFileSource(filesFromReader);
        };
      }
    }
  }

  async function handlePreviewDeleteItem(event, index) {
    event.preventDefault();
    console.log("D E L E T E - index", index);
    const files = document.getElementById("images").files;
    console.log("O L D - files", files);
    let list = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
      if (i === index) {
        console.log("F O U N D - i", i);
      } else {
        console.log("i", i);
        let file = document.getElementById("images").files[i];
        list.items.add(file);
      }
    }
    let newFileList = list.files;
    document.getElementById("images").files = newFileList;
    console.log("N E W - files", document.getElementById("images").files);
    handlePreview();
  }

  async function handleImagesUpload() {
    const urlImages = [];
    if (previewFileSource.length > 0) {
      const fileFormData = new FormData();
      for (let i = 0; i < previewFileSource.length; i++) {
        const file = previewFileSource[i];
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

    productData.images = await handleImagesUpload();

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

  console.log(
    "previewFileSource before R E T U R N",
    previewFileSource.slice(0)
  );
  return (
    <>
      <form
        className="grid"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <fieldset className="grid__itemFull grid">
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
        </fieldset>

        <fieldset className="grid__itemFull grid">
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
        </fieldset>

        <fieldset className="grid__itemFull grid">
          <label className="grid__itemFull" htmlFor="width">
            Width:
            <input
              type="number"
              id="width"
              name="width"
              min="0"
              defaultValue={productToEdit ? productToEdit.dimensions.width : 9}
            />
          </label>

          <label className="grid__itemFull" htmlFor="depth">
            Depth:
            <input
              type="number"
              id="depth"
              name="depth"
              min="0"
              defaultValue={productToEdit ? productToEdit.dimensions.depth : 9}
            />
          </label>

          <label className="grid__itemFull" htmlFor="height">
            Height:
            <input
              type="number"
              id="height"
              name="height"
              min="0"
              defaultValue={productToEdit ? productToEdit.dimensions.height : 9}
            />
          </label>
        </fieldset>

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

        <fieldset className="grid__itemFull grid form__imagePreview">
          {previewFileSource ? (
            <>
              {previewFileSource.map((file, i) => {
                return (
                  <div key={i} className="imageWrap grid__item025 outline">
                    <button
                      className="outline"
                      onClick={(event) => {
                        handlePreviewDeleteItem(event, i);
                      }}
                    >
                      X
                    </button>
                    <img src={file} alt={`Selected image ${i + 1}`} />
                  </div>
                );
              })}
            </>
          ) : (
            <h4 className="grid__itemFull">Please select an image</h4>
          )}
        </fieldset>

        <label className="grid__itemFull" htmlFor="available">
          Available:
          <input
            type="checkbox"
            id="available"
            name="available"
            defaultChecked={productToEdit ? productToEdit.available : true}
          />
        </label>

        <fieldset className="grid__itemFull cc">
          <button type="submit">
            {productToEdit ? "Save changes" : "Create product"}
          </button>
        </fieldset>
      </form>
    </>
  );
}
