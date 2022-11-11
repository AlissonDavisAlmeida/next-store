import NextLink from "next/link"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { FC, useContext } from "react";
import ItemCounter from "../ui/ItemCounter";
import { Cart, CartContext } from "../../context";


interface CartListProps {
    editable: boolean;
}

export const CartList: FC<CartListProps> = ({ editable }) => {


    const { cart: productsInCart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

    const onNewQuantity = (product: Cart, newQuantity: number) => {
        product.quantity = newQuantity;

        updateCartQuantity(product)
    }

    const removeProductFromCart = (product: Cart) => {
        removeCartProduct(product)
    }

    return (
        <>
            {
                productsInCart.map((product) => {
                    return (

                        <Grid
                            container
                            spacing={2}
                            key={product.slug + product.sizes}
                            gap={1}
                            sx={{
                                mb: 1
                            }}
                        >
                            <Grid item xs={3}>
                                <NextLink href={`/products/${product.slug}`} passHref>
                                    <Link>
                                        <CardActionArea>
                                            <CardMedia
                                                image={`/products/${product.images}`}
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
                                    <Typography variant="body1">Size: <strong>{product.sizes}</strong></Typography>

                                    {
                                        editable && <ItemCounter
                                            quantity={product.quantity}
                                            maxVal={10}
                                            updateQuantity={(quantity) => onNewQuantity(product, quantity)}
                                        />
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={2} display="flex" alignItems={`center`} flexDirection={`column`}>
                                <Typography variant="subtitle1">{`$${product.price}`}</Typography>

                                {
                                    editable && <Button variant="outlined" color="error" onClick={() => removeProductFromCart(product)}>Remove</Button>
                                }

                            </Grid>
                        </Grid>
                    )
                })

            }
        </>
    );
}
