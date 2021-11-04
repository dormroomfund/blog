import jsonp from "jsonp"; // JSON w/ Padding request
import Head from "next/head"; // HTML head
import Link from "next/link"; // Dynamic routing
import Router from "next/router"; // Router
import nProgress from "nprogress"; // nProgress
import queryString from "query-string"; // Parse object to query string
import { useState, useEffect } from "react"; // State management
import styles from "styles/Layout.module.css"; // Component module styling
import newsletter from "styles/Newsletter.module.css"; // Newsletter CTA styling
import { HamburgerButton } from "react-hamburger-button"; // Animated hamburger button

// Router load animations
nProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeErorr", () => nProgress.done());

export default function Layout(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    // Layout wrapper
    mounted && (
      <div className={styles.layout}>
        {/* HTML Head */}
        <HTMLHead isPost={props.isPost} />

        {/* Header component */}
        <Header />

        {/* Wrapper to contain child components */}
        <div className={styles.content}>{props.children}</div>

        {/* Footer component */}
        <Footer />
      </div>
    )
  );
}

/**
 * HTML <Head></Head> container
 */
function HTMLHead({ isPost }) {
  return (
    <Head>
      {/* Shared meta */}
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />

      {!isPost ? (
        // If page is not an individual post
        // With its own injected meta
        // Inject home meta
        <>
          {/* Meta: General meta */}
          <title>Final Draft</title>
          <meta name="title" content="Final Draft" />
          <meta
            name="description"
            content="Dorm Room Fund's go-to blog for all things student entrepreneurship."
          />

          {/* Meta: Open Graph + Facebook */}
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
          <meta
            property="twitter:url"
            content="https://blog.dormroomfund.com/"
          />
          <meta property="twitter:title" content="Final Draft" />
          <meta
            property="twitter:description"
            content="Dorm Room Fund's go-to blog for all things student entrepreneurship."
          />
          <meta
            property="twitter:image"
            content="https://blog.dormroomfund.com/brand/meta.png"
          />
        </>
      ) : null}

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
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

      {/* Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-8XTR9WCB7L"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-8XTR9WCB7L');
              `,
        }}
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
            <img src="/brand/logo.svg" alt="Dorm Room Fund logo" />
          </a>
        </div>
        <div>
          <Link href="/">
            <a>Final Draft.</a>
          </Link>
        </div>
        <div>
          <a
            href="https://airtable.com/embed/shrIkIQTZqkdcS05v"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for Funding
          </a>
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
            <img src="/brand/logo.svg" alt="Dorm Room Fund logo" />
          </a>
        </div>
        <div>
          <a
            href="https://airtable.com/embed/shrIkIQTZqkdcS05v"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for Funding
          </a>
        </div>
      </div>
    </>
  );
}

/**
 * Page Global Footer
 */
function Footer() {
  const [email, setEmail] = useState(""); // Newsletter email
  const [button, setButton] = useState("Sign Up"); // Button text

  /**
   * Subscribe to newsletter
   */
  const joinNewsletter = async () => {
    // Create data object with email
    const data = {
      EMAIL: email,
    };

    // Make request to Mailchimp endpoint
    await jsonp(
      `${process.env.NEXT_PUBLIC_MAILCHIMP_POST_URL}&${queryString.stringify(
        data
      )}`,
      // Override cross-origin
      { param: "c" }
    );

    // Empty email and toggle button state
    setEmail("");
    setButton("Subscribed!");

    // Revert button state after brief pause (2s)
    setTimeout(() => {
      setButton("Sign Up");
    }, 2 * 1000);
  };

  return (
    <div className={styles.footer}>
      {/* Left container */}
      <div>
        {/* Email Newsletter Subscription CTA */}
        <iframe
          src="https://dormroomfund.substack.com/embed"
          width="480"
          height="320"
          frameborder="0"
          scrolling="no"
        ></iframe>
        {/* <h3>Super Secret Content</h3>
        <p>
          Stay up to date with job openings, invite-only events, and
          opportunities to join our team.
        </p>

        <div className={newsletter.newsletterBox}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={joinNewsletter}>{button}</button>
        </div> */}
      </div>

      {/* Right container */}
      <div>
        {/* Quicklinks */}
        <ul>
          <li>
            <a
              href="https://drive.google.com/drive/folders/13kIXHJjCRs5nfrqiww5aq_e0mzrJOY6J"
              target="_blank"
              rel="noopener noreferrer"
            >
              Press Kit
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/DormRoomFund"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://dormroomfund.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Legal
            </a>
          </li>
        </ul>

        {/* Rights */}
        <span>Final Draft 2020</span>
      </div>
    </div>
  );
}
