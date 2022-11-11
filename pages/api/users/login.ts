import { compareSync } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../database/db";
import User from "../../../models/User";
import { signToken } from "../../../utils/jwt";



type Data = {
    message: string;
    token?: string;
    user?: {
        role: string;
        name: string;
        email: string;
    }
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case "POST":
            return loginUser(req, res);


        default:
            return res.status(405).json({ message: "Method not allowed" });
    }

}


async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { email = "", password = "" } = req.body;

    await connect()

    const user = await User.findOne({ email })

    await disconnect()

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    if (!compareSync(password, user.password!)) {
        return res.status(400).json({ message: "Password is incorrect" })
    }

    const { role, name, email: userEmail, _id } = user

    const token = signToken({ _id, email: userEmail })

    return res.status(200).json({
        message: "User logged in successfully",
        token,
        user: {
            role,
            name,
            email: userEmail
        }
    })


}