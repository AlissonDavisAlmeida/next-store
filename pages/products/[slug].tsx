import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLAyout } from "../../components/layout";
import { ProductSlideShow } from "../../components/products/ProductsSlideShow";
import { SeedProduct } from "../../database/seed-data";

import { GetStaticPaths, GetStaticProps } from "next";
import "react-slideshow-image/dist/styles.css";
import { SizeSelector } from "../../components/products/";
import ItemCounter from "../../components/ui/ItemCounter";
import { getAllProducts, getProductBySlug } from "../../database/dbProducts";
import { useContext, useState } from "react";
import { Cart, CartContext } from "../../context";
import { useRouter } from "next/router";

interface SlugProps {
    product: SeedProduct
}

function Slug({ product }: SlugProps) {

    const router = useRouter()

    const { addProduct: addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<Cart>({
        _id: product._id,
        images: product.images[0],
        price: product.price,
        sizes: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    })

    const addProduct = () => {
        if (!tempCartProduct.sizes) return


        addProductToCart(tempCartProduct)

        router.push('/cart')
    }


    return (
        <ShopLAyout
            title={product.title}
            pageDescription={product.description}
        >

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <ProductSlideShow images={product.images} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection={"column"}>


                        <Typography variant="h1" component="h1">{product.title}</Typography>
                        <Typography variant="subtitle1" component="h2">{`$ ${product.price}`}</Typography>

                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2">Quantity</Typography>
                            <ItemCounter
                                quantity={tempCartProduct.quantity}
                                maxVal={product.inStock}
                                updateQuantity={(quantity) => setTempCartProduct(prevState => ({
                                    ...prevState,
                                    quantity
                                }))}

                            />
                            <SizeSelector
                                selectedSize={tempCartProduct.sizes}
                                sizes={product.sizes}
                                onSelectSize={(sizes) => setTempCartProduct(prevState => ({ ...prevState, sizes }))}
                            />
                        </Box>


                        {
                            product.inStock === 0 ? (
                                <Chip
                                    color="error"
                                    variant="outlined"
                                    label={`No available sizes`}

                                />
                            ) : (
                                <Button color="secondary" className="circular-btn" onClick={addProduct}>
                                    {
                                        tempCartProduct.sizes ? "Add to cart" : "Select size"

                                    }
                                </Button>
                            )
                        }

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLAyout>
    );

}



export const getStaticPaths: GetStaticPaths = async () => {

    const allSlugs = await getAllProducts()

    return {
        paths: allSlugs.map(({ slug }) => ({
            params: {
                slug
            }
        })),
        fallback: "blocking"
    }

}

export const getStaticProps: GetStaticProps = async (context) => {

    const slug = context.params?.slug as string

    const product = await getProductBySlug(slug)

    if (!product) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }

}



export default Slug;