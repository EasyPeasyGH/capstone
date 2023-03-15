import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Capstone - 404</title>
        <meta name="description" content="Capstone final next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="error">
        <h2>Not Found</h2>
        <h4>Error 404. Page cannot be found.</h4>
        <p>
          Go back to the <Link href="/">Homepage</Link>.
        </p>
      </section>
    </>
  );
}
