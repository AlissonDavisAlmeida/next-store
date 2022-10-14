import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { UIContext } from "../../../context";


export const Navbar: FC = (props) => {

    const route = useRouter()

    const { toogleSideMenu } = useContext(UIContext)

    const [searchTerm, setSearchTerm] = useState("")
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const color = (path: string) => {
        return route.pathname === path ? "info" : "primary"
    }


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return

        route.push(`/search/${searchTerm}`)

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
                <Box
                    className="fadeIn"
                    sx={{
                        display: isSearchVisible ? "none" : { xs: "none", sm: "flex" },
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

                <IconButton
                    sx={{
                        display: { xs: "flex", sm: "none" }
                    }}
                    onClick={toogleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>


                {
                    isSearchVisible ?
                        (
                            <Input
                                sx={{
                                    display: { xs: "none", sm: "flex" },
                                }}
                                className="fadeIn"
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && onSearchTerm()}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                setIsSearchVisible(false)
                                            }}
                                            aria-label="toggle password visibility"
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        ) :
                        (
                            <IconButton
                                sx={{
                                    display: { xs: "none", sm: "flex" }
                                }}
                                onClick={() => setIsSearchVisible(true)}
                                className="fadeIn"
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }


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