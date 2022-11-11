import { Grid, Typography } from "@mui/material"
import { FC, useContext } from "react"
import { CartContext } from "../../context"

export const OrderSummary: FC = () => {

    const { quantity, total } = useContext(CartContext)

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Products</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent={`end`}>
                <Typography>{quantity}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent={`end`}>
                <Typography>{`$${total}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes (15%)</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent={`end`}>
                <Typography>{new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }).format(total * 0.15)}</Typography>
            </Grid>
        </Grid>
    )
}