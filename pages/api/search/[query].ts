import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../database/db";
import { SeedProduct } from "../../../database/seed-data";
import Product from "../../../models/Products";


type Data = {
    message: string;
    products?: SeedProduct[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case "GET":
            return searchProducts(req, res);
        default:
            return res.status(405).json({ message: "Method not allowed" });
    }
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    let { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Query is required" });
    }

    query = query.toString().toLowerCase();

    
    await connect();

    const products = await Product.find({ $text: { $search: query} })
    .select("title images price inStock slug -_id");

    await disconnect()


    return res.status(200).json({ message: "Success", products });
}