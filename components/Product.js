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
  const { push } = router;

  return (
    <div className={`product`} onClick={() => push(`product/${id}`)}>
      <div className="imageWrap">
        <button className={`outline ${!available && "unavailable"}`}>
          {images.length}
        </button>
        <img
          src={images[0]}
          alt={`Image 1 for ${name}`}
          width="100%"
          className={!available && "unavailable"}
        />
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
        <p className={!available && "unavailable"}>{`${price} €`}</p>
      </div>
    </div>
  );
}
