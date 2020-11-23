<img src="https://i.imgur.com/tCvz99i.png" height="50" style="padding-bottom: 15px;"/>

# Final Draft ([live](https://blog.dormroomfund.org))

Final Draft is [Dorm Room Fund's](https://dormroomfund.com) go-to blog for all things student entrepreneruship.

## General Architecture

1. [NodeJS](https://nodejs.org/en/) application powered by the [Next.JS](https://nextjs.org/) framework.
2. [WordPress.com](https://wordpress.com) headless CMS backend.
3. [WPGraphQL](https://github.com/wp-graphql/wp-graphql) plugin to power WordPress GraphQL endpoint.
4. [Apollo](https://www.apollographql.com/) to retrieve and cache posts.
5. [Mailchimp](https://mailchimp.com/) for Newsletter subscription.
6. [Puppeteer](https://github.com/puppeteer/puppeteer) for dynamic meta image generation.

### Project structure

```
/apollo
  index.js # Exports apollo client
  parse.js # Functions to clean query responses
  queries.js # GraphQL queries
/ components
  Layout.js # Layout wrapper. Handles header, content, footer, meta.
  Newsletter.js # Mailchimp Newsletter CTA component
/ pages
  /api
    meta.js # Renders dynamic meta image based on post slug
  /post
    [slug].js # Individual post page
  _app.js
  _document.js
  404.js # 404 page
  index.js # Home page
  search.js # Search page
/public
  /brand # Brand assets
  /favicon # Favicons
  /fonts # Font files
  /vectors # Vector (SVG) assets
/styles # Stylesheets
/utils
  index.js # Convenient hooks
.env.local.sample # Environment variables
.gitignore
.prettierrc
README.md
jsconfig.json # Better path configuration
package.json
yarn.lock
```

## Prerequisites

There are a few configuration details (in terms of setting up the headless [WordPress.com](https://wordpress.com) CMS) that must be run through before testing locally or deploying.

1. Install the [WPGraphQL](https://github.com/wp-graphql/wp-graphql) plugin on WordPress.
2. Change the Permalink settings under `Settings > Permalinks` to a `Post name` url structure. This is necessary to reference posts by their slug.

Because [WordPress.com](https://wordpress.com), unlike [WordPress.org](https://wordpress.org) does not allow editing source php files, a workaround is used for the following steps:

3. Download the [Twenty Seventeen](https://en-ca.wordpress.org/themes/twentyseventeen/) theme locally.
4. Modify the `functions.php` file in the root of the Twenty Seventeen theme to include the required php custom functions from `custom.php`. These can go anywhere in the file.
5. Compress the Twenty Seventeen folder into a single `.zip` file.
6. Upload the theme to WordPress and activate it.

For future maintainability, do note, WordPress.com does not allow you to overwrite the same theme. Thus, if you need to make multiple changes, you cannot keep reuploading the Twenty Seventeen theme. To bypass this, you must:

7. Get the SFTP credentials for WordPress.com from the dashboard.
8. Delete the `twentyseventeen` directory under `wp-content/themes/`.
9. Now you can reupload your locally edited theme. Note: WordPress will still show Twenty Seventeen as active, but it isn't—it has already fallen back to another theme by this point.

## Run locally

Duplicate `.env.local.sample` to `.env.local` and replace `NEXT_PUBLIC_WP_URL` and `NEXT_PUBLIC_MAILCHIMP_POST_URL` with your headless WordPress CMS and Mailchimp list subscription form URLs. Then:

```bash
# Install dependencies
yarn

# Run locally
yarn dev
```

## Deploy

The following instructions are to deploy to [Heroku](http://heroku.com/).

```bash
# Add puppetter buildpack (first-time)
heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack

# Add NodeJS buildpack (first-time)
heroku buildpacks:add --index 1 heroku/nodejs

# Push to Heroku
git push heroku master
```
