import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendMessage } from '../features/chat/chatSlice';
import { RootState } from '../app/store';

interface Message {
	dateTime: string;
	userId: number;
	message: string;
}

interface User {
	id: number;
	fullName: string;
	email: string;
	password: string;
}

const GroupChat = () => {
	const [message, setMessage] = useState('');
	const [msgError, setMsgError] = useState('');

	const dispatch = useDispatch();

	const messages = useSelector<RootState, Message[]>(
		(state) => state.chat.messages
	);
	const users = useSelector<RootState, User[]>((state) => state.user.users);
	const loggedInUser = useSelector<RootState, User>(
		(state) => state.user.loggedInUser!
	);

	const validateMessage = () => {
		if (!message || !message.trim()) {
			setMsgError('Please input message');
			return false;
		} else {
			setMsgError('');
			return true;
		}
	};

	const dateFormat = (date: Date) => {
		return (
			'[' +
			date.getFullYear() +
			'-' +
			date.getDate() +
			'-' +
			(date.getMonth() + 1) +
			' ' +
			date.getHours() +
			':' +
			date.getMinutes() +
			':' +
			date.getSeconds() +
			']'
		);
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const msg = message.trim();
		const userId = loggedInUser.id;
		const msgDate = dateFormat(new Date());

		const validMsg = validateMessage();

		if (!msgError && validMsg) {
			interface Message {
				dateTime: string;
				userId: number;
				message: string;
			}

			const data: Message = {
				dateTime: msgDate,
				userId: userId,
				message: msg,
			};

			dispatch(sendMessage(data));
			setMessage('');
		}
	};

	return (
		<div className='border-2 border-black rounded mt-4'>
			<div className='flex justify-between '>
				<span className='text-lg text-center w-full px-2 py-0.5'>
					Group Chat
				</span>
				<span className='border-2 border-black rounded justify-center px-1 my-0.5'>
					<FontAwesomeIcon icon={['fas', 'xmark']} fontSize='20' />
				</span>
			</div>
			<div
				id='chat-history'
				className='border-2 border-black rounded py-8 px-2 h-72'
			>
				{messages.map((chat, index) => {
					let chatUser = users.find(({ id }) => id === chat.userId);

					return (
						<p key={index}>
							{chat.dateTime} {chatUser!.fullName}: {chat.message}
						</p>
					);
				})}
			</div>

			<form
				onSubmit={handleSubmit}
				className='flex flex-row space-x-2 py-4 px-10'
			>
				<strong>
					<span>{loggedInUser.fullName}</span>
				</strong>

				<div className='w-9/12'>
					<textarea
						name='message'
						className='border-2 border-black rounded w-full'
						rows={1}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onBlur={validateMessage}
					></textarea>
					{msgError ? (
						<p className='text-red-500 text-xs italic p-1'>
							{msgError}
						</p>
					) : (
						''
					)}
				</div>

				<div className='space-x-2'>
					<input
						type='submit'
						value='Send'
						className='border-2 border-black rounded-lg font-bold px-2'
					/>
					<input
						type='button'
						value='Refresh'
						id='reset-btn'
						onClick={() => window.location.reload()}
						className='border-2 border-black rounded-lg font-bold px-2'
					/>
				</div>
			</form>
		</div>
	);
};

export default GroupChat;
