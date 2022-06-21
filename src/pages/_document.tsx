import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Rubik:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-neutral-200 dark:bg-slate-900">
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
