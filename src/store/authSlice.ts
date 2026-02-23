import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    role: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    username: null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ username: string; role: string }>) {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.role = action.payload.role;
        },
        clearUser(state) {
            state.isLoggedIn = false;
            state.username = null;
            state.role = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;