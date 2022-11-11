import { hashSync } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../database/db";
import User from "../../../models/User";
import { signToken } from "../../../utils/jwt";
import { isValidEmail } from "../../../utils/validations";

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
            return signupUser(req, res);


        default:
            return res.status(405).json({ message: "Method not allowed" });
    }

}

async function signupUser(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { email = "", password = "", name = "" } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Email is Invalid" })
    }

    await connect()
    const userExists = await User.findOne({ email })

    if (userExists) {
        await disconnect()
        return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({
        email,
        password: hashSync(password),
        name,
        role: "client"
    })

    try {
        await user.save({ validateBeforeSave: true })
        await disconnect()

    } catch (err: any) {
        await disconnect()
        return res.status(500).json({ message: "Something went wrong: " + err.message })
    }

    const { _id, role } = user

    const token = signToken({ _id, email })

    return res.status(200).json({
        message: "User created successfully",
        token,
        user: {
            role,
            name,
            email
        }
    })

}
