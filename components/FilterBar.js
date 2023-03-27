import Link from "next/link";

export default function FilterBar({ data, showAll, filterFor }) {
  function amountOf(prop) {
    const Amount = data.filter((p) => p.category.includes(prop)).length;
    console.log("Amount of", prop, Amount);
    return Amount;
  }
  return (
    <ul className="filterBar">
      <li>
        <Link
          href="/"
          onClick={() => {
            showAll();
          }}
        >
          All Objects <sup>{data.length}</sup>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          onClick={() => {
            filterFor("Chair");
          }}
        >
          Chairs <sup>{amountOf("Chair")}</sup>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          onClick={() => {
            filterFor("Lamp");
          }}
        >
          Lamps <sup>{amountOf("Lamp")}</sup>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          onClick={() => {
            filterFor("Table");
          }}
        >
          Tables <sup>{amountOf("Table")}</sup>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          onClick={() => {
            filterFor("Miscellaneous");
          }}
        >
          Miscellaneous <sup>{amountOf("Miscellaneous")}</sup>
        </Link>
      </li>
    </ul>
  );
}
