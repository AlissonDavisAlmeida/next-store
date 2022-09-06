import NextLink from "next/link"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { FC } from "react";
import { initialData } from "../../database/products";
import ItemCounter from "../ui/ItemCounter";

const productsInCart = initialData.products.slice(0, 3);

interface CartListProps {
    editable: boolean;
}

export const CartList: FC<CartListProps> = ({ editable }) => {
    return (
        <>
            {
                productsInCart.map((product) => {
                    return (

                        <Grid
                            container
                            spacing={2}
                            key={product.slug}
                            gap={1}
                            sx={{
                                mb: 1
                            }}
                        >
                            <Grid item xs={3}>
                                <NextLink href={`/product/slug`} passHref>
                                    <Link>
                                        <CardActionArea>
                                            <CardMedia
                                                image={`products/${product.images[0]}`}
                                                component="img"
                                                sx={{ borderRadius: "5px" }}

                                            />
                                        </CardActionArea>
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item xs={5}>
                                <Box display="flex" flexDirection={`column`}>
                                    <Typography variant="body1">{product.title}</Typography>
                                    <Typography variant="body1">Size: <strong>{product.sizes[0]}</strong></Typography>

                                    {
                                        editable && <ItemCounter />
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={2} display="flex" alignItems={`center`} flexDirection={`column`}>
                                <Typography variant="subtitle1">{`$${product.price}`}</Typography>

                                {
                                    editable && <Button variant="outlined" color="error">Remove</Button>
                                }

                            </Grid>
                        </Grid>
                    )
                })

            }
        </>
    );
}
