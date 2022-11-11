import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layout";
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { shopApi } from '../../api/shopApi';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData = {
    name: string;
    email: string;
    password: string;
}

function RegisterPage() {

    const [error, showError] = useState(false);
    const [messageError, setMessageError] = useState("");

    const { register: registerUser } = useContext(AuthContext)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: '',
            email: "",
            password: ""
        }
    })

    const editError = (message: string) => {
        showError(true);
        setMessageError(message);
        setTimeout(() => {
            showError(false);
        }, 3000);
    }

    const onSubmit = async (dataForm: FormData) => {

        showError(false);
        try {
            const { hasError, message } = await registerUser(dataForm)

            if (hasError) {
                editError(message);
                return;
            }

            const destination = router.query.page?.toString() || "/";

            router.replace(destination)

        } catch (err: any) {
            editError(err.response.data.message);

        }
    }

    return (

        <AuthLayout
            title="Register"
            pageDescription="Register to your account"
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">
                                Register User
                            </Typography>
                            {error && <Chip
                                label={messageError}
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"

                            />
                            }
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                variant="filled"
                                fullWidth
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required"
                                    }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type={"email"}
                                variant="filled"
                                fullWidth
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    }
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
                                        message: "Password is required"
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" className="circular-btn" size={"large"} type="submit" fullWidth>
                                Register
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <NextLink href={`/auth/login?page=${router.query.page?.toString()}`} passHref>
                                <Link underline="always" >
                                    Do have an account? Login
                                </Link>
                            </NextLink>

                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
}

export default RegisterPage;