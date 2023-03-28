import { useRouter } from "next/router";

export default function Search({ searchFor, search, toggleSearch }) {
  const router = useRouter();
  const { push } = router;
  return (
    <form
      className={search ? "search search--on" : "search"}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchData = Object.fromEntries(formData);
        console.log("S U B M I T");
        push("/");
        search = !search;
        toggleSearch(search);
        if (searchData.search > 0) {
          searchFor(event.target.value.toLowerCase());
        }
        event.target.reset();
      }}
    >
      <label htmlFor="name"></label>
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
