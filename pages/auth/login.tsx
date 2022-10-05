import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { AuthLayout } from "../../components/layout";

function Login() {
    return (

        <AuthLayout
            title="Login"
            pageDescription="Login to your account"
        >
            <Box sx={{ width: 350, padding: "10px 20px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">
                            Login
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Email" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type="password" variant="filled" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size={"large"} fullWidth>
                            Login
                        </Button>
                    </Grid>

                    <Grid item xs={12} sx={{textAlign:"center"}}>
                        <NextLink href={`/auth/register`} passHref>
                            <Link underline="always" >
                                Don't have an account? Register
                            </Link>
                        </NextLink>

                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
}

export default Login;