import { useRouter } from "next/router";
import Image from "next/image";

export default function BasketProduct({
  id,
  name,
  description,
  available,
  price,
  category,
  designer,
  condition,
  dimensions,
  images,
}) {
  const router = useRouter();
  const { push } = router;

  console.log("id", id);

  return (
    <>
      <div className="imageWrap grid__itemBasket outline">
        <img
          src={images[0]}
          alt={`Image 1 for ${name}`}
          width="100%"
          onClick={() => push(`product/${id}`)}
        />
      </div>
      <div className="grid__itemBasket2">
        <label htmlFor="name">
          <input type="text" id="name" name="name" value={name} readonly />
        </label>
        <label htmlFor="category">
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            readonly
          />
        </label>
        <label htmlFor="amount">
          <input type="number" id="amount" name="amount" value={1} min="0" />
        </label>
      </div>
      <div className="grid__itemBasket">
        <label htmlFor="price">
          <input type="number" id="price" name="price" value={price} readonly />
        </label>
      </div>
    </>
  );
}
