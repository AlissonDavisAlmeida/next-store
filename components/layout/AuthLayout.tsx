import { Box } from "@mui/material";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";

interface AuthLayoutProps {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: React.ReactNode;

}

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({ children, title = "Home Page", imageFullUrl, pageDescription }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <main>
                <Box 
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="calc(100vh - 200px)"
                >
                    {children}
                </Box>
            </main>

        </>
    )

}