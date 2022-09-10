import NextLink from "next/link";
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from "@mui/material";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { ShopLAyout } from "../../components/layout";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

function OrderPage() {
    return (
        <ShopLAyout
            title="OrderPage of your order"
            pageDescription="Review your order"
        >
            <Typography variant="h1" component="h1">Order: adofa2</Typography>

            <Chip
                sx={{ my: 2 }}
                label="Order is being processed"
                variant="outlined"
                color="success"
                icon={<CreditScoreOutlined />}
            />
            {/* <Chip
                sx={{my:2}}
                label="Order is being processed"
                variant="outlined"
                color="error"
                icon={<CreditCardOffOutlined/>}
            /> */}

            <Grid container sx={{ mt: 2 }}>

                <Grid item xs={12} md={7}>
                    <CartList editable={false} />

                </Grid>

                <Grid item xs={12} md={5} >
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Summary (3 products)</Typography>
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
                            <Typography>Alisson</Typography>
                            <Typography>delivery address</Typography>
                            <Typography>delivery address</Typography>
                            <Typography>delivery address</Typography>
                            <Typography>delivery address</Typography>

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
                                <h1>pay</h1>

                                <Chip
                                    sx={{ my: 2 }}
                                    label="Order is being processed"
                                    variant="outlined"
                                    color="success"
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLAyout>
    );
}

export default OrderPage;