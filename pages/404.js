import Link from "next/link"; // Dynamic routing
import Layout from "components/Layout"; // Layout wrapper
import styles from "styles/404.module.css"; // Component module styling

export default function FourOhFour() {
  return (
    <Layout>
      <div className={styles.fourohfour}>
        <h1>404</h1>
        <p>Oops, that page doesn't exist!</p>
        <Link href="/">
          <a>Go Back Home</a>
        </Link>
      </div>
    </Layout>
  );
}
