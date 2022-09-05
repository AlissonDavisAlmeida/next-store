import { Box, Button, Grid, Typography } from "@mui/material";
import { ShopLAyout } from "../../components/layout";
import { ProductSlideShow } from "../../components/products/ProductsSlideShow";
import { initialData } from "../../database/products"

import "react-slideshow-image/dist/styles.css";
import ItemCounter from "../../components/ui/ItemCounter";
import {SizeSelector} from "../../components/products/";

const product = initialData.products[0]

function Slug() {
    return (
        <ShopLAyout
            title={product.title}
            pageDescription={product.description}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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

                        <Button color="secondary" className="circular-btn">
                            Add to cart
                        </Button>

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

export default Slug;