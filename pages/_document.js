import Document, { Html, Head, Main, NextScript } from "next/document"; // Import document

export default class CustomDocument extends Document {
  render() {
    return (
      // Explicitly add HTML language for performance
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
