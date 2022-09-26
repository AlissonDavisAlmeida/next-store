import NextLink from "next/link";
import { AppBar, Badge, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { Box } from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { UIContext } from "../../../context";


export const Navbar: FC = (props) => {

    const route = useRouter()

    const { toogleSideMenu } = useContext(UIContext)

    const color = (path: string) => {
        return route.pathname === path ? "info" : "primary"
    }

    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref>
                    <Link display="flex" alignItems="center">
                        <Typography variant="h6">Devcycle</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />
                <Box sx={{
                    display: { xs: "none", sm: "flex" },
                }}>
                    <NextLink href="/category/men" passHref>
                        <Link>
                            <Button color={color("/category/men")}>
                                Mens
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/women" passHref>
                        <Link>
                            <Button color={color("/category/women")}>
                                Womens
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/kids" passHref>
                        <Link>
                            <Button color={color("/category/kids")}>
                                Kids
                            </Button>
                        </Link>
                    </NextLink>

                </Box>
                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toogleSideMenu}>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
}