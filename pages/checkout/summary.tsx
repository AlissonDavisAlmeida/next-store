import NextLink from "next/link";
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from "@mui/material";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { ShopLAyout } from "../../components/layout";
import { useContext } from "react";
import { CartContext } from "../../context";

function Summary() {

    const { shippingAddress, quantity } = useContext(CartContext)

    return (
        <ShopLAyout
            title="Summary of your order"
            pageDescription="Review your order"
        >
            <Typography variant="h1" component="h1">Order Summary</Typography>

            <Grid container sx={{ mt: 2 }}>

                <Grid item xs={12} md={7}>
                    <CartList editable={false} />

                </Grid>

                <Grid item xs={12} md={5} >
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Summary ({quantity} {quantity <= 1 ? 'product' : 'products'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <NextLink href={`/checkout/address`} passHref>
                                    <Link underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant="subtitle1">delivery address</Typography>
                            <Typography>{shippingAddress?.name}</Typography>
                            <Typography>{shippingAddress?.address}</Typography>
                            <Typography>{shippingAddress?.city},{shippingAddress?.country}</Typography>
                            <Typography>{shippingAddress?.codePostal}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <NextLink href={`/cart`} passHref>
                                    <Link underline="always">
                                        Cart
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />
                            <Box sx={{
                                mt: 3
                            }}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Place Order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLAyout>
    );
}

export default Summary;