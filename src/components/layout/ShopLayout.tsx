import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "./ui";

interface ShopLayoutProps {
    title: string;
    pageDescription: string;
    imageFullUrl: string;
}

export const ShopLAyout: FC<PropsWithChildren & ShopLayoutProps> = ({ children, title = "Home Page", imageFullUrl, pageDescription }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageDescription} />

                {
                    imageFullUrl && (
                        <meta property="og:image" content={imageFullUrl} />
                    )
                }
            </Head>

            <Navbar />


            <main style={{
                margin: "80px auto",
                maxWidth: "1440px",
                padding: "0 30px",
            }}>
                {children}
            </main>

            <footer>

            </footer>
        </>
    )
}