import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { FC } from "react";
import { ProductWithId } from "./ProductsList";

interface ProductCardProps {
    product: ProductWithId
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {


    return (
        <Grid item xs={6} sm={4} key={product.slug}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component={"img"}
                        image={`products/${product.images[0]}`}
                        alt={product.title}
                    />
                </CardActionArea>
            </Card>
        </Grid>
    )
}