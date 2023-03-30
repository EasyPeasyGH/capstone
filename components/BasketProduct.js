import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function BasketProduct({
  index,
  id,
  name,
  description,
  available,
  price,
  amountPrice,
  category,
  designer,
  condition,
  dimensions,
  images,
  currency,
  handleRemoveProduct,
  updateProductPrice,
}) {
  const router = useRouter();
  const { push } = router;

  const [amount, setAmount] = useState(1);

  return (
    <>
      <div className="imageWrap grid__itemBasket outline">
        <button
          className="outline"
          onClick={(event) => {
            handleRemoveProduct(event, id, index);
          }}
        >
          X
        </button>
        <img
          src={images[0]}
          alt={`Image 1 for ${name}`}
          width="100%"
          onClick={() => push(`product/${id}`)}
        />
      </div>
      <div className="grid__itemBasket2">
        <label htmlFor={`name${index}`}>
          <input
            type="text"
            id={`name${index}`}
            name={`name${index}`}
            value={name}
            readOnly
          />
        </label>
        <label htmlFor={`category${index}`}>
          <input
            type="text"
            id={`category${index}`}
            name={`nacategoryme${index}`}
            value={category}
            readOnly
          />
        </label>
        <label htmlFor={`amount${index}`}>
          <input
            type="number"
            id={`amount${index}`}
            name={`amount${index}`}
            defaultValue={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              updateProductPrice(id, index, event.target.value);
            }}
            min="1"
            max="10"
          />
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
        <label htmlFor={`price${index}`}>
          <input
            type="number"
            id={`price${index}`}
            name={`price${index}`}
            value={amountPrice}
            readOnly
          />
        </label>
      </div>
    </>
  );
}
