import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="headerBar">
        <div className="headerBar__box">
          <div className="icon">
            <Link href="/menu" target="_self" alt="Link to menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </Link>
          </div>
          <div className="icon">
            <Link href="/create" target="_self" alt="Link to create">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
              </svg>
            </Link>
          </div>
        </div>
        <h1>
          <Link href="/">Capstone</Link>
        </h1>
        <div className="headerBar__box">
          <div className="icon">
            <Link href="/searchbar" target="_self" alt="Link to search bar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </Link>
          </div>
          <div className="icon">
            <Link
              href="/shoppingcard"
              target="_self"
              alt="Link to shopping card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <nav>
        <ul>
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
      </nav>
    </header>
  );
}
