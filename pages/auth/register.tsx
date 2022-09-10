import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layout";

function RegisterPage() {
    return (

        <AuthLayout
            title="Register"
            pageDescription="Register to your account"
        >
            <Box sx={{ width: 350, padding: "10px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">
                            Register User
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Name" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type="password" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size={"large"} fullWidth>
                            Register
                        </Button>
                    </Grid>

                    <Grid item xs={12} sx={{textAlign:"center"}}>
                        <NextLink href={`/auth/login`} passHref>
                            <Link underline="always" >
                                Do have an account? Login
                            </Link>
                        </NextLink>

                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
}

export default RegisterPage;