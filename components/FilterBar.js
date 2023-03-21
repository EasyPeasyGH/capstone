import Link from "next/link";

export default function ProductList() {
  return (
    <ul className="filterBar">
      <li>
        <Link href="/collections">
          All Objects <sup>33</sup>
        </Link>
      </li>
      <li>
        <Link href="/chairs">
          Chairs <sup>4</sup>
        </Link>
      </li>
      <li>
        <Link href="/lamps">
          Lamps <sup>7</sup>
        </Link>
      </li>
      <li>
        <Link href="/tables">
          Tables <sup>3</sup>
        </Link>
      </li>
      <li>
        <Link href="/accessoires">
          Accessoires <sup>20</sup>
        </Link>
      </li>
    </ul>
  );
}
