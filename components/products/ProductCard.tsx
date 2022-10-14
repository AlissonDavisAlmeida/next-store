import NextLink from "next/link"
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { ProductWithId } from "./ProductsList";

interface ProductCardProps {
    product: ProductWithId
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {

    const [isHovered, setisHovered] = useState(false)
    const [isImageLoaded, setisImageLoaded] = useState(false)

    const productImage = useMemo(() => {

        return !isHovered ? `/products/${product.images[0]}` : `/products/${product.images[1]}`
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
                <NextLink href={`/products/${product.slug}`} passHref prefetch={false}>
                    <Link>



                        <CardActionArea>
                            {
                                product.inStock === 0 && (
                                    <Chip
                                        color="warning"
                                        label={`No available sizes`}
                                        sx={{
                                            position: "absolute",
                                            zIndex: 1,
                                            top: "10px",
                                            left: "10px",
                                        }}
                                    />
                                )
                            }

                            <CardMedia
                                className="fadeIn"
                                component={"img"}
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setisImageLoaded(true)}
                            />
                        </CardActionArea>

                    </Link>
                </NextLink>
            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }} className="fadeIn">
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`R$ ${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}