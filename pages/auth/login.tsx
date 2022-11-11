import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { shopApi } from "../../api/shopApi";
import { AuthLayout } from "../../components/layout";
import { AuthContext } from "../../context";
import { isEmail } from "../../utils/validations";

type FormData = {
    email: string;
    password: string;
}

function Login() {

    const [showError, setShowError] = useState(false)
    const [messageError, setMessageError] = useState("");

    const { login } = useContext(AuthContext)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const showErrorMsg = (msg: string) => {
        setShowError(true);
        setMessageError(msg);
        setTimeout(() => {
            setShowError(false);
        }, 3000);
    }

    const onSubmit = async (dataForm: FormData) => {

        setShowError(false);
        try {
            const isLogged = await login(dataForm);

            if (!isLogged) {
                showErrorMsg("Error al iniciar sesión");
                return
            }

            const destination = router.query.page?.toString() || "/";

            router.replace(destination)
        } catch (err: any) {
            console.log("🚀 ~ file: register.tsx ~ line 34 ~ onSubmit ~ err", err)
            showErrorMsg("Error al iniciar sesión");
        }

    }

    return (

        <AuthLayout
            title="Login"
            pageDescription="Login to your account"
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">
                                Login
                            </Typography>
                            {showError && <Chip
                                label="User not Found"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"

                            />
                            }
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="filled"
                                fullWidth
                                type={"email"}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    validate: isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="filled"
                                fullWidth
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    }
                                })}

                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color="secondary"
                                className="circular-btn"
                                size={"large"}
                                fullWidth
                                type="submit"
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <NextLink href={`/auth/register?page=${router.query.page?.toString()}`} passHref>
                                <Link underline="always" >
                                    Don't have an account? Register
                                </Link>
                            </NextLink>

                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
}

export default Login;