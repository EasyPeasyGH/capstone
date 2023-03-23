import Link from "next/link";

export default function ProductList() {
  return (
    <ul className="filterBar">
      <li>
        <Link href="/">
          All Objects <sup>33</sup>
        </Link>
      </li>
      <li>
        <Link href="/chairs" className="unavailable">
          Chairs <sup>4</sup>
        </Link>
      </li>
      <li>
        <Link href="/lamps" className="unavailable">
          Lamps <sup>7</sup>
        </Link>
      </li>
      <li>
        <Link href="/tables" className="unavailable">
          Tables <sup>3</sup>
        </Link>
      </li>
      <li>
        <Link href="/accessoires" className="unavailable">
          Accessoires <sup>20</sup>
        </Link>
      </li>
    </ul>
  );
}
