import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
	id: number;
	fullName: string;
	email: string;
	password: string;
}

export interface UserState {
	users: User[];
	isSuccess: boolean;
	isError: boolean;
	message: string;
	loggedInUser: User | null;
}

const initialState: UserState = {
	users: JSON.parse(localStorage.getItem('Users')) || [],
	isSuccess: false,
	isError: false,
	message: '',
	loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		register: (state, action: PayloadAction<User>) => {
			state.users.push(action.payload);
			state.isSuccess = true;
			localStorage.setItem('Users', JSON.stringify(state.users));
		},
		login: (
			state,
			action: PayloadAction<{ email: string; password: string }>
		) => {
			const { email, password } = action.payload;
			const emailExist = state.users.find((u) => u.email === email);

			if (emailExist) {
				const user = state.users.find(
					(u) => u.email === email && u.password === password
				);
				if (user) {
					state.loggedInUser = user;
					localStorage.setItem(
						'loggedInUser',
						JSON.stringify(state.loggedInUser)
					);
					state.isSuccess = true;
				} else {
					state.isError = true;
					state.message = 'Wrong email or password!';
				}
			} else {
				state.isError = true;
				state.message = 'Email is not registered yet!';
			}
		},
		logout: (state) => {
			state.loggedInUser = null;
			localStorage.removeItem('loggedInUser');
		},
		updateUser: (
			state,
			action: PayloadAction<{
				id: number;
				fullName: string;
				email: string;
			}>
		) => {
			const { id, fullName, email } = action.payload;
			const user = state.users.find((user) => user.id === +id);
			user.fullName = fullName;
			user.email = email;
			localStorage.setItem('Users', JSON.stringify(state.users));

			if (state.loggedInUser.id === +id) {
				state.loggedInUser.fullName = fullName;
				state.loggedInUser.email = email;
			}
			localStorage.setItem(
				'loggedInUser',
				JSON.stringify(state.loggedInUser)
			);
			state.isSuccess = true;
		},
		deleteUser: (state, action: PayloadAction<number>) => {
			state.users = state.users.filter(
				(user) => user.id !== +action.payload
			);
			localStorage.setItem('Users', JSON.stringify(state.users));
			state.isSuccess = true;
		},
		resetUser: (state) => {
			state.users = JSON.parse(localStorage.getItem('Users')) || [];
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
			state.loggedInUser =
				JSON.parse(localStorage.getItem('loggedInUser')) || null;
		},
	},
});

export const { login, logout, register, updateUser, deleteUser, resetUser } =
	userSlice.actions;

export default userSlice.reducer;
