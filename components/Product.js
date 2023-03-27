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
      <div className="imageWrap">
        <button className="outline">{images.length}</button>
        <img src={images[0]} alt={`Image 1 for ${name}`} width="100%" />
        {/* {images.map((image, i) => {
          return (
            <img
              key={i}
              src={image}
              alt={`Image ${i + 1} for ${name}`}
              width="100%"
            />
          );
        })} */}
      </div>

      <div className="product__info">
        <h4>{name}</h4>
        <p>{`${price} €`}</p>
      </div>
    </div>
  );
}
