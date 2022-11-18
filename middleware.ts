import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from "jose"


export async function middleware(request: NextRequest) {

    const token = request.cookies.get("token") || ""

    try {
        const { _id, email } = await verifyTokenWithJose(token)
        console.log("🚀 ~ file: middleware.ts ~ line 12 ~ middleware ~ email", email)
        return NextResponse.next()
    } catch (error) {
        const { protocol, host, pathname } = request.nextUrl
        return NextResponse.redirect(`${protocol}//${host}/auth/login/?page=${pathname}`)
    }

}


export const config = {
    matcher: ['/checkout/:path*'],
}


export const verifyTokenWithJose = async (token: string) => {
    if (!process.env.SECRET_JWT) {
        return Promise.reject("Secret JWT is not defined")
    }

    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SECRET_JWT || ""))

    return Promise.resolve(payload)
}