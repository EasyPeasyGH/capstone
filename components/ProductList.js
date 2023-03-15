import { useRouter } from "next/router";
import Product from "./Product";

export default function ProductList({ products }) {
  const router = useRouter();

  return (
    <>
      <ul className="grid">
        {products.map((p) => (
          <li key={p._id} className="grid__item outline">
            <Product
              id={p._id}
              name={p.name}
              description={p.description}
              available={p.available}
              price={p.price}
              category={p.category}
              designer={p.designer}
              condition={p.condition}
              dimensions={p.dimensions}
              images={p.images}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
