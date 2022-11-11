import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react"
import { AuthContext, authReducer } from "."
import { shopApi } from "../../api/shopApi";
import { IUser } from "../../models/User";

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface AuthProviderProps {
    children: React.ReactNode
}

export type LoginPayload = {
    email: string;
    password: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [state, dispatch] = useReducer(authReducer, initialState)
    const router = useRouter()

    const checkToken = async () => {

        try {
            const token = Cookies.get('token');

            if (!token) {
                dispatch({ type: "[Auth]-Logout" })
            }

            if (token) {
                const { data } = await shopApi.get('/users/validate-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                Cookies.set('token', data.token)
                dispatch({
                    type: '[Auth]-Login',
                    payload: data.user
                })
            }

        } catch (err) {
            console.log("🚀 ~ file: AuthProvider.tsx ~ line 56 ~ checkToken ~ err", err)
            Cookies.remove('token')
        }
    }

    useEffect(() => {
        checkToken();

    }, [])


    const login = async (user: LoginPayload): Promise<boolean> => {
        try {
            const { data } = await shopApi.post('/users/login', user)
            const { token, user: userLogged } = data

            Cookies.set('token', token)

            dispatch({
                type: '[Auth]-Login',
                payload: userLogged
            })

            return true
        } catch (err: any) {
            console.log(err)
            return false
        }
    }

    const logout = (): void => {
            Cookies.remove('token')
            Cookies.remove('cart')
            router.reload()
        
    }

    const register = async (user: Pick<IUser, "name" | "email" | "password">): Promise<{ hasError: boolean, message: string }> => {
        try {
            const { data } = await shopApi.post('/users/signup', user)
            const { token, user: userLogged } = data

            Cookies.set('token', token)

            dispatch({
                type: '[Auth]-Login',
                payload: userLogged
            })

            return {
                hasError: false,
                message: "User created successfully"
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: "Something went wrong when trying to register user"
            }
        }
    }




    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}