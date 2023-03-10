import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface User {
	id: number;
	fullName: string;
	email: string;
	password: string;
}

const LoginSuccess = () => {
	const loggedInUser = useSelector<RootState, User>(
		(state) => state.user.loggedInUser!
	);

	return (
		<div className='flex flex-col items-center pt-8 h-screen'>
			<h2 className='text-2xl font-semibold mb-9'>Login Successful</h2>

			<p>
				<strong>Welcome !</strong> {loggedInUser.email}
			</p>
		</div>
	);
};

export default LoginSuccess;
