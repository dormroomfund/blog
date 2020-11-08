import Head from "next/head"; // HTML head
import Link from "next/link"; // DYnamic links
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
          <Link href="/search">
            <a>Search</a>
          </Link>
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
        <div>
          <Link href="/search">
            <a>Search</a>
          </Link>
        </div>
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
  );
}
