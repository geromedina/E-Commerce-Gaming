import { Token } from "@/api";

export async function authFetch(url, params) {
    const tokenCtrol = new Token();
    const token = tokenCtrol.getToken();

    const logout = () => {
        tokenCtrol.removeToken();
        window.location.replace("/");
    };

    if (!token) {
        logout();
    } else {
        if (tokenCtrol.hasExpired(token)) {
            logout();
        } else {
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                return await fetch(url, paramsTemp);
            } catch (error) {
                return error;
            }
        }
    }
}
