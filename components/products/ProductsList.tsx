import { Grid } from "@mui/material";
import { FC } from "react";
import { SeedProduct } from "../../database/products";
import { ProductCard } from "./ProductCard";

export type ProductWithId = SeedProduct & { id: string };

interface ProductsListProps {
    products: ProductWithId[]
}

export const ProductsList: FC<ProductsListProps> = ({ products }) => {


    return (
        <Grid container spacing={4}>

            {products.map((product) => (
                <ProductCard product={product} key={product.slug} />
            ))
            }
        </Grid>
    )

}