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
    <div className="product" onClick={() => push(`product/${id}`)}>
      <div className="imageWrap">
        <button className="outline">{images.length}</button>
        <img src={images[0]} alt={`Image 1 for ${name}`} width="100%" />
      </div>
      <div className="product__info">
        <h4>{name}</h4>
        <p>{`${price} €`}</p>
      </div>
    </div>
  );
}
