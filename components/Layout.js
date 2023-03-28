import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, search, searchFor, toggleSearch }) {
  return (
    <>
      <Header
        search={search}
        toggleSearch={toggleSearch}
        searchFor={searchFor}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
