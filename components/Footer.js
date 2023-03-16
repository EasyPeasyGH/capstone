import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <section className="footerNav">
        <Link href="/">Home</Link>
      </section>
      <section className="newsletter">
        <h2>Keep updated with our newsletter</h2>
        <form method="post" id="newsletter" acceptCharset="UTF-8">
          <label htmlFor="newsletter-email">Type your E-mail here:</label>
          <input
            type="email"
            name="newsletter-email"
            id="newsletter-email"
            placeholder="email@provider.com"
            autoCorrect="off"
            autoCapitalize="off"
            required
          ></input>
          <button type="submit">Subscribe&nbsp;→</button>
        </form>
      </section>
      <section className="footerBar">
        <ul>
          <li>
            <Link href="/impressum">Impressum</Link>
          </li>
          <li>
            <Link href="/versand">Versand</Link>
          </li>
          <li>
            <Link href="/widerruf">Widerruf</Link>
          </li>
          <li>
            <Link href="/datenschutzerklarung">Datenschutzerklärung</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/Home">Home</Link>
          </li>
          <li>
            <Link href="/FAQ">FAQ</Link>
          </li>
          <li>
            <Link href="/Contact">Contact</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/Instagram">Instagram</Link>
          </li>
          <li>
            <Link href="/Email">Email</Link>
          </li>
        </ul>
        <p>© 2023, Capstone</p>
      </section>
    </footer>
  );
}
