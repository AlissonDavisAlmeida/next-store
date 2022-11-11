import { NextApiRequest, NextApiResponse } from "next";
import { SHOP_CONSTANTS } from "../../../database/constants";
import { connect, disconnect } from "../../../database/db";
import { SeedProduct } from "../../../database/seed-data";
import Product from "../../../models/Products";

type Data = {
    message: string
    products?: SeedProduct[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case "GET":
            return getProducts(req, res)

        default:
            return res.status(405).json({ message: "Method not allowed" })
    }

}


async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { gender = "all"} = req.query

    let condition = {}

    if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(gender as any)) {
        condition = {
            gender
        }
    }

    await connect()

    const products = await Product.find(condition)
        .select("title images price inStock slug -_id")

    await disconnect()

    if (!products) {
        return res.status(404).json({ message: "No products found" })
    }

    return res.status(200).json({ message: "Products fetched successfully", products })
}


