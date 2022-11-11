import { createContext } from 'react';
import { IUser } from '../../models/User';
import { LoginPayload } from './AuthProvider';


export interface AuthContextProps {
    isLoggedIn: boolean;
    user?: IUser
    login: (user: LoginPayload) => Promise<boolean>;
    logout: () => void;
    register: (user: Pick<IUser, "name" | "email" | "password">) => Promise<{ hasError: boolean, message: string }>;
}

export const AuthContext = createContext({} as AuthContextProps)