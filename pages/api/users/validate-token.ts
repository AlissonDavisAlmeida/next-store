import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../database/db";
import User from "../../../models/User";
import { signToken, verifyToken } from "../../../utils/jwt";

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
        case "GET":
            return checkToken(req, res);


        default:
            return res.status(405).json({ message: "Method not allowed" });
    }

}


async function checkToken(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, token is not present" });
    }

    const { _id, email } = await verifyToken(token);

    await connect()

    const user = await User.findOne({ _id });

    if (!user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    await disconnect()

    const { role, name } = user


    return res.status(200).json({
        message: "Token is valid",
        token,
        user: {
            role,
            name,
            email
        }
    })


}