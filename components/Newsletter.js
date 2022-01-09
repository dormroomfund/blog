import styles from "styles/Newsletter.module.css"; // Component styles

// --> close: function to close modal
export default function Newsletter({ close }) {
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
        <iframe
          src="https://dormroomfund.substack.com/embed"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>

      {/* Newsletter close button (besides inclued X) */}
      <button onClick={close}>Keep Reading</button>
    </div>
  );
}
