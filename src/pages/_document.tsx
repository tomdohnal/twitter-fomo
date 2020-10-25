import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,500;0,700;0,800;1,800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* this prevents the FOUC in Firefox (it is a bug in Firefox)
                https://bugzilla.mozilla.org/show_bug.cgi?id=1404468 */}
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
