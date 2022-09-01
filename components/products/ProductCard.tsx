import NextLink from "next/link"
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { ProductWithId } from "./ProductsList";

interface ProductCardProps {
    product: ProductWithId
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {

    const [isHovered, setisHovered] = useState(false)

    const productImage = useMemo(() => {

        return !isHovered ? `products/${product.images[0]}` : `products/${product.images[1]}`
    }, [isHovered, product.images])

    return (
        <Grid
            item
            xs={6}
            sm={3}
            onMouseEnter={() => setisHovered(true)}
            onMouseLeave={() => setisHovered(false)}
        >
            <Card>
                <NextLink href={`products/slug`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                className="fadeIn"
                                component={"img"}
                                image={productImage}
                                alt={product.title}
                            />
                        </CardActionArea>

                    </Link>
                </NextLink>
            </Card>

            <Box sx={{ mt: 1 }} className="fadeIn">
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`R$ ${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}