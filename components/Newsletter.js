import jsonp from "jsonp"; // JSON w/ Padding request
import { useState } from "react"; // State management
import queryString from "query-string"; // Parse object to query string
import styles from "styles/Newsletter.module.css"; // Component styles

// --> close: function to close modal
export default function Newsletter({ close }) {
  const [email, setEmail] = useState(""); // Email input

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

    // Close model on completion
    close();
  };

  return (
    <div className={styles.newsletter}>
      {/* Newsletter content */}
      <h1>Subscribe to our newsletter!</h1>
      <p>
        Stay up to date with job openings, invite-only events, and opportunities
        to join our team.
      </p>

      {/* Newsletter signup */}
      <div className={styles.newsletterBox}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={joinNewsletter}>Sign Up</button>
      </div>

      {/* Newsletter close button (besides inclued X) */}
      <button onClick={close}>Keep Reading</button>
    </div>
  );
}
