import client from "apollo"; // Apollo client
import puppeteer from "puppeteer-core"; // Puppeteer core components
import chrome from "chrome-aws-lambda"; // Default Chrome serverless args
import { postMetaGenerator } from "apollo/queries"; // Single post query

export default async (req, res) => {
  const { slug } = req.query; // Collect post slug from request

  // If no slug present
  if (!slug) {
    // Return 404
    res.status(404).end();
  }

  // Generate apollo query and pull data
  const QUERY = postMetaGenerator(slug);
  const response = await client.query({ query: QUERY });

  // Generate meta image
  const html = generateHTML(
    // Post title
    response.data.postBy.title,
    // Post featured image
    response.data.postBy.featuredImage.node.mediaItemUrl
  );
  const result = await getScreenshot({ html });

  // Send meta image to client
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(result);
};

/**
 * Takes screenshot of HTML page
 * @param {string} html containing html meta image page
 */
const getScreenshot = async function ({ html }) {
  // Launch new puppetter instance
  const browser = await puppeteer.launch({
    // Default chrome args
    args: chrome.args,
    // For local testing, change to: "/Applications/Chrome.app/Contents/MacOS/Google Chrome"
    executablePath: "/Applications/Chrome.app/Contents/MacOS/Google Chrome", //await chrome.executablePath,
    // For local testing, change to: true
    headless: false,
  });

  // Create page, set content, wait for load
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle2" });

  // Get html element
  const element = await page.$("html");

  // Return new screenshot of page
  return await element.screenshot("png").then(async (data) => {
    // Close page
    await browser.close();
    // Return screenshot image
    return data;
  });
};

/**
 * Generates HTML markup, injecting post title and featured image URL
 * @param {string} title of post
 * @param {string} featuredImageURL meta image for post
 */
const generateHTML = (title, featuredImageURL) => {
  return `
    <html>
      <head>
        <style>
          @font-face {
            font-family: 'Circular Std';
            src: url("https://blog.dormroomfund.org/fonts/CircularStd-Bold.otf");
            font-style: bold;
            font-weight: 700;
            font-display: swap;
          }

          html {
            width: 1200px;
            height: 600px;
            font-family: 'Circular Std', sans-serif;
          }
  
        .content {
          width: 1200px;
          height: 600px;
          background-image: url(${featuredImageURL});
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          position: absolute;
          bottom: 0px;
          left: 0px;
        }

        .overlay {
          width: 1200px;
          height: 600px;
          background-color: rgba(38,6,73,0.95);
        }

        .pattern {
          background-image: url("https://blog.dormroomfund.com/brand/pattern.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          width: 1060px;
          height: 600px;
          padding: 0px 70px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pattern > div {
          padding-top: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .pattern > div > img {
          height: 33px;
        }

        .pattern > div > h1 {
          color: #fff;
          font-size: 55px;
          line-height: 65px;
          text-align: center;
          margin-block-start: 15px;
        }
        </style>
      </head>
      <body>
        <div class="content">
          <div class="overlay">
            <div class="pattern">
              <div>
                <img src="https://blog.dormroomfund.com/brand/wordmark.png" />
                <h1>${title}</h1>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
