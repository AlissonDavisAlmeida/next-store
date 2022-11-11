import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { ShopLAyout } from "../../components/layout";
import { verifyToken } from "../../utils/jwt";
const Address: FC = () => {


    return (
        <ShopLAyout
            title={`Destination`}
            pageDescription={`Confirm your destination`}
        >
            <Typography variant="h1" component="h1">Destination</Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Name" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Nickname" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Address" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Address 2 (optional)" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Postal Code" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="City" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant="filled"
                            label="Country"
                            value={1}
                        >
                            <MenuItem value={1}>USA</MenuItem>
                            <MenuItem value={2}>Argentina</MenuItem>
                            <MenuItem value={3}>Brazil</MenuItem>
                            <MenuItem value={4}>Portugal</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Fone" variant="filled" fullWidth />
                </Grid>
            </Grid>

            <Box sx={{
                mt: 5,
                display: 'flex',
                justifyContent: 'center'

            }}>
                <Button color="secondary" className="circular-btn" size="large">
                    Review order
                </Button>
            </Box>

        </ShopLAyout>
    )
}

export default Address

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = "" } = req.cookies
    let userId = ""
    let isValidToken = false

    try {
        userId = (await verifyToken(token))._id
        isValidToken = true
    } catch (error) {
        isValidToken = false
        console.log(error)
    }

    if(!isValidToken) {
        return {
            redirect: {
                destination: "/auth/login?page=/checkout/address",
                permanent: false
            }
        }
    }



    return {
        props: {
            
        }
    }
}