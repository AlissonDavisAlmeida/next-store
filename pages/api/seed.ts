import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../database/db";
import { initialData } from "../../database/products";
import Product from "../../models/Products";

type Data ={

    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){


    if(process.env.NODE_ENV === "production"){
        return res.status(403).json({message: "Forbidden"})
    }

    await connect()

    await Product.deleteMany()

    await Product.insertMany(initialData.products)

    await disconnect()

    res.status(200).json({message: 'Hello World'})


}