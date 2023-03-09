import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import chatReducer from '../features/chat/chatSlice';
import documentReducer from '../features/document/documentSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chat: chatReducer,
		document: documentReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
