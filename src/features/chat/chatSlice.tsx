import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Message {
	dateTime: string;
	userId: number;
	message: string;
}

export interface ChatState {
	messages: Message[];
}

const initialState: ChatState = {
	messages: JSON.parse(localStorage.getItem('Chats')!) || [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		sendMessage: (state, action: PayloadAction<Message>) => {
			state.messages.push(action.payload);
			localStorage.setItem('Chats', JSON.stringify(state.messages));
		},
		deleteUserMessages: (state, action: PayloadAction<number>) => {
			state.messages = state.messages.filter(
				(msg) => msg.userId !== +action.payload
			);
			localStorage.setItem('Chats', JSON.stringify(state.messages));
		},
	},
});

export const { sendMessage, deleteUserMessages } = chatSlice.actions;

export default chatSlice.reducer;
