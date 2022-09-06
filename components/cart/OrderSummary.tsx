import { Grid, Typography } from "@mui/material"
import { FC } from "react"

export const OrderSummary: FC = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Products</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent={`end`}>
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent={`end`}>
                <Typography>{`$${1020.02}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes (15%)</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent={`end`}>
                <Typography>{`$${100.02}`}</Typography>
            </Grid>
        </Grid>
    )
}