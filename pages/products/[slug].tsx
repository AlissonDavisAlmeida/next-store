import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLAyout } from "../../components/layout";
import { ProductSlideShow } from "../../components/products/ProductsSlideShow";
import { SeedProduct } from "../../database/products";

import { GetStaticPaths, GetStaticProps } from "next";
import "react-slideshow-image/dist/styles.css";
import { SizeSelector } from "../../components/products/";
import ItemCounter from "../../components/ui/ItemCounter";
import { getAllProducts, getProductBySlug } from "../../database/dbProducts";

interface SlugProps {
    product: SeedProduct
}

function Slug({ product }: SlugProps) {

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
                            <ItemCounter />
                            <SizeSelector
                                sizes={product.sizes}
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
                                <Button color="secondary" className="circular-btn">
                                    Add to cart
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