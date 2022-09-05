import NextLink from "next/link"
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { ShopLAyout } from "../../components/layout";

function CartEmpty() {
    return (
        <ShopLAyout
            title="Cart Empty"
            pageDescription="Cart Empty"
        >
            <Box
                display="flex"
                sx={{ flexDirection: { xs: "column", md: "row" } }}
                justifyContent={"center"}
                alignItems="center"
                height={`calc(100vh - 200px)`}>

                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display="flex" flexDirection={`column`} alignItems="center">
                    <Typography variant="h1" component="h1">Cart Empty</Typography>
                    <NextLink href="/" passHref>
                        <Link typography={`h4`} color="secondary">
                            Return to Home Page
                        </Link>
                    </NextLink>
                </Box>

            </Box>
        </ShopLAyout>
    );
}

export default CartEmpty;