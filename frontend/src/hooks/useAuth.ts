import { useState } from "react";
import { User } from "../models/user.model";
import { getUser, LoginData, RegisterData } from "../lib/api";
import { navigate } from "../config/navigation";
import axios from "axios";
import { register as registerAPI, login as loginApi, logout as logoutApi } from "../lib/api";

const useAuth = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterData) => {
        setLoading(true)
        try {
            const response = await registerAPI(data);
            setUser(response.data);
            if (navigate) {
                navigate("/")
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                const errorMessage = err.message || 'An unknown error occurred'
                setError(errorMessage);
                return
            }
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || 'An unknown error occurred'
                setError(errorMessage)
                return
            }
            setError("Internal server error");
        } finally {
            setLoading(false)
        }
    };

    const login = async (data: LoginData) => {
        setLoading(true)
        try {
            const response = await loginApi(data);
            setUser(response.data);
            if (navigate) {
                navigate("/")
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                const errorMessage = err.message || 'An unknown error occurred'
                setError(errorMessage);
                return
            }
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || 'An unknown error occurred'
                setError(errorMessage)
                return
            }
            setError("Internal server error");
        } finally {
            setLoading(false)
        }
    };

    const logout = async () => {
        setLoading(true)
        try {
            await logoutApi();
            setUser(undefined);
            if (navigate) {
                navigate("/login")
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                const errorMessage = err.message || 'An unknown error occurred'
                setError(errorMessage);
                return
            }
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || 'An unknown error occurred'
                setError(errorMessage)
                return
            }
            setError("Internal server error");
        } finally {
            setLoading(false)
        }
    };

    const checkAuth = async () => {
        setLoading(true)
        try {
            const response = await getUser();
            setUser(response.data.user);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }
            setError("Internal server error");
            setUser(undefined);
        } finally {
            setLoading(false);
        }
    };



    return { user, loading, error, register, login, logout, checkAuth };
};

export default useAuth;
