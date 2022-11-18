import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        Credentials({
            name: "Custom Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },

            },
            authorize: async (credentials) => {
                console.log(credentials);


            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),


    ],

    jwt: {
        // secret: process.env.SECRET_JWT as string,
    },

    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => { }
    }
})