import Head from "next/head";
import Link from "next/link";
import styles from "styles/Layout.module.css";

export default function Layout(props) {
  return (
    // Layout wrapper
    <div className={styles.layout}>
      {/* HTML Head content */}
      <Head>
        {/* Meta content */}
        <title>First Draft</title>

        {/* Preload fonts for performance */}
        <link
          rel="preload"
          href="/fonts/CircularStd-Book.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/CircularStd-BookItalic.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/CircularStd-Bold.otf"
          as="font"
          crossOrigin=""
        />
      </Head>

      {/* Header component */}
      <div className={styles.header}>
        <div>
          <a
            href="https://dormroomfund.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dorm Room Fund
          </a>
        </div>
        <div>
          <Link href="/">
            <a>Final Draft.</a>
          </Link>
        </div>
        <div>
          <Link href="/search">
            <a>Search</a>
          </Link>
        </div>
      </div>

      {/* Content wrapper to contain child components */}
      <div className={styles.content}>{props.children}</div>

      {/* Footer component */}
      <div className={styles.footer}>
        <div>
          <div>
            <h1>
              <Link href="/">
                <a>Final Draft.</a>
              </Link>
            </h1>
            <h4>
              by{" "}
              <a
                href="https://dormroomfund.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dorm Room Fund
              </a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
