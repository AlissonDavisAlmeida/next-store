import {
    SearchOutlined,
    AccountCircleOutlined,
    ConfirmationNumberOutlined,
    MaleOutlined,
    FemaleOutlined,
    EscalatorWarningOutlined,
    VpnKeyOutlined,
    LoginOutlined,
    CategoryOutlined, AdminPanelSettings
} from "@mui/icons-material"
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    Input,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon, ListItemText, ListSubheader
} from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { AuthContext, UIContext } from "../../../context"

export const SideMenu = () => {

    const { push, asPath } = useRouter()

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return

        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url: string) => {
        toogleSideMenu()
        push(url)
    }


    const { isOpenMenu, toogleSideMenu } = useContext(UIContext)
    const { isLoggedIn, user, logout } = useContext(AuthContext)

    const [searchTerm, setSearchTerm] = useState("")

    const logoutOff = () => {
        logout()
    }

    return (
        <Drawer
            open={isOpenMenu}
            anchor="right"
            sx={{
                backdropFilter: "blur(4px)",
                transition: "all 0.5s ease-out"
            }}
            onClose={toogleSideMenu}

        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onSearchTerm()}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                        aria-label="toggle password visibility"
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {isLoggedIn &&
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>

                    }

                    <ListItem
                        button
                        sx={{ display: { xs: '', md: 'none' } }}
                        onClick={() => navigateTo("/category/men")}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo("/category/women")}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo("/category/kids")}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ni??os'} />
                    </ListItem>

                    {isLoggedIn ? (

                        <ListItem button onClick={() => logoutOff()}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                    ) : (
                        <ListItem button onClick={() => navigateTo(`/auth/login?page=${asPath}`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )}



                    {/* Admin */}
                    {
                        user?.role === "admin" && (
                            <>
                                <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>

                                <ListItem button>
                                    <ListItemIcon>
                                        <CategoryOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Productos'} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Ordenes'} />
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <AdminPanelSettings />
                                    </ListItemIcon>
                                    <ListItemText primary={'Usuarios'} />
                                </ListItem>
                            </>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}