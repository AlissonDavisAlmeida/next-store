import Product from "../models/Products"
import { connect, disconnect } from "./db"
import { SeedProduct } from "./products"

export const getProductBySlug = async (slug: string): Promise<SeedProduct | null> => {

    await connect()

    const product = await Product.findOne({ slug }).lean()

    await disconnect()

    if (!product) return null

    return JSON.parse(JSON.stringify(product))

}

interface ProductSlugs {
    slug: string
}


export const getAllProducts = async (): Promise<ProductSlugs[]> => {

    await connect()

    const productsSlugs = await Product.find().select("title images price inStock slug -_id").lean()

    await disconnect()

    return JSON.parse(JSON.stringify(productsSlugs))

}

export const getProductsByTerm = async (term: string): Promise<ProductSlugs[]> => {

    await connect()

    const products = await Product.find({ $text: { $search: term.toLowerCase() } })
        .select("title images price inStock slug -_id").lean()

    await disconnect()

    return products

}