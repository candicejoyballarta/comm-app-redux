import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Document {
	fileId: number;
	fileName: string;
	label: string;
	userId: number;
	sharedIds: number[];
}

export interface DocumentState {
	documents: Document[];
}

const initialState: DocumentState = {
	documents: JSON.parse(localStorage.getItem('Documents')) || [],
};

export const documentSlice = createSlice({
	name: 'document',
	initialState,
	reducers: {
		uploadDocument: (state, action: PayloadAction<Document>) => {
			state.documents.push(action.payload);
			localStorage.setItem('Documents', JSON.stringify(state.documents));
		},
		editDocument: (
			state,
			action: PayloadAction<{ fileId: number; label: string }>
		) => {
			const documentIndex = state.documents.findIndex(
				(doc) => doc.fileId === action.payload.fileId
			);
			if (documentIndex !== -1) {
				state.documents[documentIndex].label = action.payload.label;
				localStorage.setItem(
					'Documents',
					JSON.stringify(state.documents)
				);
			}
		},
		shareDocument: (
			state,
			action: PayloadAction<{ id: number; selected: number }>
		) => {
			const { id, selected } = action.payload;
			const document = state.documents.find(
				({ fileId }) => fileId === +id
			);
			const shares = document.sharedIds;
			if (document !== -1) {
				shares.push(+action.payload.selected);
				localStorage.setItem(
					'Documents',
					JSON.stringify(state.documents)
				);
			}
		},
		deleteDocument: (state, action: PayloadAction<number>) => {
			state.documents = state.documents.filter(
				(file) => file.fileId !== +action.payload
			);
			localStorage.setItem('Documents', JSON.stringify(state.documents));
		},
		removeShare: (
			state,
			action: PayloadAction<{ id: number; shareId: number }>
		) => {
			const { id, shareId } = action.payload;

			const document = state.documents.find(
				({ fileId }) => fileId === +id
			);
			let itemIndex = document.sharedIds.indexOf(shareId);
			if (itemIndex > -1) {
				document.sharedIds.splice(itemIndex, 1);
			}
			localStorage.setItem('Documents', JSON.stringify(state.documents));
		},
		deleteUserDocument: (state, action: PayloadAction<number>) => {
			state.documents = state.documents.filter(
				(file) => file.userId !== +action.payload
			);

			state.documents = state.documents.map((file) => {
				let docShares = file.sharedIds.filter(
					(sharedIds) => sharedIds !== +action.payload
				);
				return { ...file, sharedIds: docShares };
			});

			localStorage.setItem('Documents', JSON.stringify(state.documents));
		},
	},
});

export const {
	uploadDocument,
	editDocument,
	shareDocument,
	deleteDocument,
	removeShare,
	deleteUserDocument,
} = documentSlice.actions;

export default documentSlice.reducer;
