const BASE_URL = `${import.meta.env.VITE_API_URL}/api/problems`;
const authHeader = (): Record<string, string> => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const problemApi = {
    getAll: async () => {
        const res = await fetch(BASE_URL);
        return res.json();
    },

    getById: async (id: number) => {
        const res = await fetch(`${BASE_URL}/${id}`);
        return res.json();
    },

    create: async (problem: any) => {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify(problem),
        });
        return res.json();
    },

    update: async (id: number, problem: any) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify(problem),
        });
        return res.json();
    },

    delete: async (id: number) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { ...authHeader() },
        });
    },
};