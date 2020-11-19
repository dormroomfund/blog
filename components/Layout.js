import Head from "next/head"; // HTML head
import Link from "next/link"; // Dynamic routing
import { useState, useEffect } from "react"; // State management
import styles from "styles/Layout.module.css"; // Component module styling
import { HamburgerButton } from "react-hamburger-button"; // Animated hamburger button

export default function Layout(props) {
  return (
    // Layout wrapper
    <div className={styles.layout}>
      {/* HTML Head */}
      <HTMLHead />

      {/* Header component */}
      <Header />

      {/* Wrapper to contain child components */}
      <div className={styles.content}>{props.children}</div>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

/**
 * HTML <Head></Head> container
 */
function HTMLHead() {
  return (
    <Head>
      {/* Meta title + description */}
      <title>Final Draft</title>
      <meta name="title" content="Final Draft" />
      <meta
        name="description"
        content="Dorm Room Fund's go-to blog for all things student entrepreneurship."
      />

      {/* Meta: Open Graph + Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://blog.dormroomfund.com/" />
      <meta property="og:title" content="Final Draft" />
      <meta
        property="og:description"
        content="Dorm Room Fund's go-to blog for all things student entrepreneurship."
      />
      <meta
        property="og:image"
        content="https://blog.dormroomfund.com/brand/meta.png"
      />

      {/* Meta: Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://blog.dormroomfund.com/" />
      <meta property="twitter:title" content="Final Draft" />
      <meta
        property="twitter:description"
        content="Dorm Room Fund's go-to blog for all things student entrepreneurship."
      />
      <meta
        property="twitter:image"
        content="https://blog.dormroomfund.com/brand/meta.png"
      />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />

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
  );
}

/**
 * Page Global Header
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  /**
   * Updates mobile menu state on page resize
   */
  const updateDimensions = () => {
    // If page width > 900px
    if (window.innerWidth > 900) {
      // Automatically close mobile menu
      setMenuOpen(false);
    }
  };

  // --> Lifecycle: componentDidMount
  useEffect(() => {
    // Update dimensions on first page load
    updateDimensions();

    // Update dimensions on each page resize
    window.addEventListener("resize", updateDimensions);

    // --> Lifecycle: componentWillUnmount
    return () => {
      // Remove event listener when unmounting component for performance
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <>
      {/* Main header */}
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
          {/* 
          
          Fast-follow: Search

          <Link href="/search">
            <a>Search</a>
          </Link>*/}
        </div>

        {/* Mobile menu toggle (hidden >900px width) */}
        <div className={styles.headerMobileButton}>
          <HamburgerButton
            open={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
            width={24}
            height={14}
            strokeWidth={3}
            color="black"
          />
        </div>
      </div>
      {/* Mobile menu */}
      <div
        // Update open/closed state based on menuOpen
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
        }`}
      >
        <div>
          <a
            href="https://dormroomfund.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dorm Room Fund
          </a>
        </div>
        {/*

        Fast-follow: Search

        <div>
          <Link href="/search">
            <a>Search</a>
          </Link>
        </div>*/}
      </div>
    </>
  );
}

/**
 * Page Global Footer
 */
function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <div>
          <h1>
            <Link href="/">
              <a>Final Draft.</a>
            </Link>
          </h1>
          <h2>
            by{" "}
            <a
              href="https://dormroomfund.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dorm Room Fund
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}
