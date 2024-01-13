import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="HERMES Group" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" content="HermesEmail - Automated Email" />
        <meta name="description" content="AI Powered Email Automation Software" />
        {/* title */}
        <title>Hermes Email</title>
        {/* Favicon */}
        {/* theme css */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
