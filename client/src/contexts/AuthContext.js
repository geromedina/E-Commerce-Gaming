import { createContext, useState, useEffect } from "react";
import { Token, User } from "@/api";

const tokenCtrol = new Token();
const userCtrol = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const token = tokenCtrol.getToken();

            if (!token) {
                logout();
                setLoading(false);
                return;
            }

            if (tokenCtrol.hasExpired(token)) {
                logout();
            } else {
                await login(token);
            }
        })();
    }, []);

    const login = async (token) => {
        try {
            // TODO: Setear el token en el localStorage
            tokenCtrol.setToken(token);
            // TODO: Obtener los datos del usuario
            const response = await userCtrol.getMe();
            // TODO: Setear los datos del usuario en el state user
            setUser(response);
            // TODO: Setear el valor de token en el state token
            setToken(token);
            // TODO: Hacer un setLoading false
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const logout = () => {
        tokenCtrol.removeToken();
        setToken(null);
        setUser(null);
    };

    const updateUser = (key, value) => {
        setUser({
            ...user,
            [key]: value,
        });
    };

    const data = {
        accessToken: token,
        user,
        login,
        logout,
        updateUser,
    };

    if (loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
