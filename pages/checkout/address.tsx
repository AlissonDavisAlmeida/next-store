import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ShopLAyout } from "../../components/layout";
import { CartContext } from "../../context";
import { countries } from "../../database/countries";
import { verifyToken } from "../../utils/jwt";

type FormData = {
    name: string;
    nickname: string;
    address: string
    address2: string
    codePostal: string
    city: string
    country: string
    phone: string
}

const getAddressFromCookies = (): FormData => {

    const name = Cookies.get("name") || "";
    const nickname = Cookies.get("nickname") || "";
    const address = Cookies.get("address") || "";
    const address2 = Cookies.get("address2") || "";
    const codePostal = Cookies.get("codePostal") || "";
    const city = Cookies.get("city") || "";
    const country = Cookies.get("country") || "";
    const phone = Cookies.get("phone") || "";

    return { name, nickname, address, address2, codePostal, city, country, phone };
}

const Address: FC = () => {



    const router = useRouter()
    const { updateAddress } = useContext(CartContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    })


    const sendFormData = (dataForm: FormData) => {
        Cookies.set("name", dataForm.name);
        Cookies.set("nickname", dataForm.nickname);
        Cookies.set("address", dataForm.address);
        Cookies.set("address2", dataForm.address2 || "");
        Cookies.set("codePostal", dataForm.codePostal);
        Cookies.set("city", dataForm.city);
        Cookies.set("country", dataForm.country);
        Cookies.set("phone", dataForm.phone);


        updateAddress(dataForm)
        router.push("/checkout/summary")
    }


    return (
        <ShopLAyout
            title={`Destination`}
            pageDescription={`Confirm your destination`}
        >
            <Typography variant="h1" component="h1">Destination</Typography>
            <form onSubmit={handleSubmit(sendFormData)}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            variant="filled"
                            fullWidth
                            {...register("name", { required: true })}
                            error={!!errors.name}
                            helperText={errors.name && "Name is required"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nickname"
                            variant="filled"
                            fullWidth
                            {...register("nickname", { required: true })}
                            error={!!errors.nickname}
                            helperText={errors.nickname && "Nickname is required"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            variant="filled"
                            fullWidth
                            {...register("address", { required: true })}
                            error={!!errors.address}
                            helperText={errors.address && "Address is required"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address 2 (optional)"
                            variant="filled"
                            fullWidth
                            {...register("address2")}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Postal Code"
                            variant="filled"
                            fullWidth
                            {...register("codePostal", { required: true })}
                            error={!!errors.codePostal}
                            helperText={errors.codePostal && "Postal Code is required"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            variant="filled"
                            fullWidth
                            {...register("city", { required: true })}
                            error={!!errors.city}
                            helperText={errors.city && "City is required"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                defaultValue={countries[2].code}
                                variant="filled"
                                label="Country"
                                {...register("country", { required: true })}
                                error={!!errors.country}

                            >
                                {
                                    countries.map((country, index) => (
                                        <MenuItem
                                            key={country.code}
                                            value={country.code}
                                        >
                                            {country.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField
                            >
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone"
                            variant="filled"
                            fullWidth
                            {...register("phone", { required: true })}
                            error={!!errors.phone}
                            helperText={errors.phone && "Phone is required"}
                        />
                    </Grid>
                </Grid>

                <Box sx={{
                    mt: 5,
                    display: 'flex',
                    justifyContent: 'center'

                }}>
                    <Button
                        color="secondary"
                        type="submit"
                        className="circular-btn"
                        size="large">
                        Review order
                    </Button>
                </Box>
            </form>
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

    if (!isValidToken) {
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