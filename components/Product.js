import { useRouter } from "next/router";
import Image from "next/image";

export default function Product({
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

  return (
    <div className="product" onClick={() => router.push(`product/${id}`)}>
      <img
        src={typeof images[0] === "string" ? `${images[0]}` : "Empty"}
        alt={
          typeof images[0] === "string"
            ? `Image for ${name}`
            : `No image for ${name}`
        }
        width="100%"
        // layout="fill"
        // objectFit="contain"
      />
      <div className="product__info">
        <h4>{name}</h4>
        <p>{`${price} €`}</p>
      </div>
    </div>
  );
}
