import jwt from "jsonwebtoken"


type Payload = {
    _id: string
    email: string

}

export const signToken = ({ _id, email }: Payload) => {
    if (!process.env.SECRET_JWT) {
        throw new Error("Secret JWT is not defined")
    }

    const token = jwt.sign({ _id, email }, process.env.SECRET_JWT, { expiresIn: "10d" })

    return token
}

export const verifyToken = async (token: string) => {
    if (!process.env.SECRET_JWT) {
        return Promise.reject("Secret JWT is not defined")
    }

    const payload = jwt.verify(token, process.env.SECRET_JWT) as Payload

    return Promise.resolve(payload)
}

