import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { ShopLAyout } from "../../components/layout";

function CartPage() {
    return (
        <ShopLAyout
            title="Cart"
            pageDescription="Cart"
        >
            <Typography variant="h1" component="h1">Cart</Typography>

            <Grid container>

                <Grid item xs={12} md={7}>
                    <CartList editable />

                </Grid>

                <Grid item xs={12} md={5} >
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Order</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />
                            <Box sx={{
                                mt: 3
                            }}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLAyout>
    );
}

export default CartPage;