import Document, { DocumentContext, Html, Main, NextScript } from "next/document";
<<<<<<< HEAD
import Head from "next/head";


class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };
=======


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
>>>>>>> c2d10bd4e5d765190082ae9505a06d35757b6ba6
    }

    render() {

        return (
            <Html lang="pt-BR">
<<<<<<< HEAD
                <Head>
=======
                <head>
>>>>>>> c2d10bd4e5d765190082ae9505a06d35757b6ba6
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />

<<<<<<< HEAD
                </Head>
=======
                </head>
>>>>>>> c2d10bd4e5d765190082ae9505a06d35757b6ba6
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
<<<<<<< HEAD

    }
=======
    }

>>>>>>> c2d10bd4e5d765190082ae9505a06d35757b6ba6
}

export default MyDocument;