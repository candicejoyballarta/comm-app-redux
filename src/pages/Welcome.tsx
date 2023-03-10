import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { resetUser } from '../features/user/userSlice';
import { RootState } from '../app/store';

interface User {
	id: number;
	fullName: string;
	email: string;
	password: string;
}

function Welcome() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSuccess = useSelector<RootState, boolean>(
		(state) => state.user.isSuccess
	);
	const loggedInUser = useSelector<RootState, User>(
		(state) => state.user.loggedInUser!
	);

	useEffect(() => {
		if (isSuccess || loggedInUser !== null) {
			navigate('/');
		}

		dispatch(resetUser());
	}, [isSuccess]);

	return (
		<div className='flex flex-col items-center pt-24 h-screen'>
			<h1 className='text-2xl font-bold'>Welcome to Users Module</h1>
			<h2 className='text-xl font-semibold p-12'>Existing Users</h2>
			<Link
				to='/login'
				className='border-black border-2 rounded-xl px-14 py-2'
			>
				Login
			</Link>
			<h2 className='text-xl font-semibold p-12'>New Users</h2>
			<Link
				to='/register'
				className='border-black border-2 rounded-xl px-14 py-2'
			>
				Register
			</Link>
		</div>
	);
}

export default Welcome;
