const BASE_URL = 'http://localhost:8080/api/auth';

export const authApi = {
    signup: async (username: string, password: string) => {
        const res = await fetch( `${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }
        return res.json();
    },

    login: async (username: string, password: string) => {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) throw new Error('로그인 실패');
        const data = await res.json();
        localStorage.setItem('token', data.token);
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    me: async () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const res = await fetch(`${BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return null;
        return res.json();
    },

    getToken: () => localStorage.getItem('token'),
};