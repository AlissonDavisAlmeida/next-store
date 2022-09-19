import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../database/db";
import { SeedProduct } from "../../../../database/products";
import Product from "../../../../models/Products";

type Data = {
    message: string
    product?: SeedProduct
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case "GET":
            return getProductWithSlug(req, res)

        default:
            return res.status(405).json({ message: "Method not allowed" })
    }


}


const getProductWithSlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug } = req.query

    await connect()

    const product = await Product.findOne({ slug })
        .select("title images price inStock slug -_id")
        .lean()



    await disconnect()

    if (!product) {
        return res.status(404).json({ message: "No product found" })
    }

    return res.status(200).json({ message: "Product fetched successfully", product })

}

