import { createContext, useState, useEffect } from 'react';
import {
    loginService,
    registerService,
    updateUserService,
} from '../services/userServices';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext(null);

const TOKEN_KEY = "authToken";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const { userId, userName } = jwt_decode(token);
                setUserId(userId);
                setUserName(userName);
                setIsAuthenticated(true);
                localStorage.setItem(TOKEN_KEY, token);
            } catch (ex) {
                console.error("Error al decodificar el token:", error);
                setToken(null);
            }
        } else {
            localStorage.removeItem(TOKEN_KEY);
            setUserName(null); // Clear the user name on logout
            setUserId(null); // Clear the user ID on logout
            setIsAuthenticated(false);
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            setLoading(true);
            const token = await loginService(username, password);
            setToken(token);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
    };

    const register = async (username, password) => {
        try {
            setLoading(true);
            const newToken = await registerService(username, password);
            setToken(newToken);
        } finally {
            setLoading(false);
        }
    };

    const update = async (fieldsToUpdate) => {
        try {
            setLoading(true);
            const newToken = await updateUserService(token, fieldsToUpdate);
            setToken(newToken);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                token,
                isAuthenticated,
                userId,
                login,
                logout,
                register,
                update,
                userName,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
