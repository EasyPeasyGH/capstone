export default function Search({ data, searchFor }) {
  function amountOf(prop) {
    const Amount = data.filter((p) => p.category.includes(prop)).length;
    console.log("Amount of", prop, Amount);
    return Amount;
  }
  return (
    <form className="search">
      <label className="grid__itemFull" htmlFor="name"></label>
      <input
        className="cc"
        type="text"
        id="search"
        name="search"
        placeholder="What are you looking for?"
        onChange={(event) => {
          if (event.target.value.length > 0) {
            searchFor(event.target.value.toLowerCase());
          }
        }}
      />
    </form>
  );
}
