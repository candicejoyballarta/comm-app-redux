import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { login, resetUser } from '../features/user/userSlice';
import checkEmail from '../utils/checkEmail';
import isObjectEmpty from '../utils/isObjectEmpty';
import { RootState } from '../app/store';

interface User {
	id: number;
	fullName: string;
	email: string;
	password: string;
}

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [formError, setFormError] = useState({
		emailErr: '',
		passwordErr: '',
	});

	const { email, password } = formData;
	const { emailErr, passwordErr } = formError;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isSuccess = useSelector<RootState, boolean>(
		(state) => state.user.isSuccess
	);
	const isError = useSelector<RootState, boolean>(
		(state) => state.user.isError
	);
	const message = useSelector<RootState, string>(
		(state) => state.user.message
	);
	const loggedInUser = useSelector<RootState, User>(
		(state) => state.user.loggedInUser!
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateEmail = () => {
		let isValidEmail = checkEmail(email);

		if (!email) {
			setFormError({ ...formError, emailErr: 'Email is required' });
			return false;
		} else if (!isValidEmail) {
			setFormError({ ...formError, emailErr: 'Email is invalid' });
			return false;
		} else {
			setFormError({ ...formError, emailErr: '' });
			return true;
		}
	};

	const validatePassword = () => {
		if (!password) {
			setFormError({ ...formError, passwordErr: 'Password is required' });
			return false;
		} else {
			setFormError({ ...formError, passwordErr: '' });
			return true;
		}
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		// Check if form data is empty
		const isDataEmpty = isObjectEmpty(formData);

		if (isDataEmpty) {
			setFormError({
				emailErr: 'Email is required',
				passwordErr: 'Password is required',
			});
		}

		// Check if there is no error on form
		const validation = isObjectEmpty(formError);

		if (!isDataEmpty && validation) {
			// dispatch login
			dispatch(login({ email, password }));
		}
	};

	useEffect(() => {
		if (isSuccess || loggedInUser !== null) {
			navigate('/');
		}

		dispatch(resetUser());
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(resetUser());
	}, [isError]);

	return (
		<div className='flex flex-col items-center pt-24 h-screen'>
			<h1 className='text-2xl font-bold'>Login</h1>
			<form onSubmit={handleSubmit} className='items-center pt-10 pr-24'>
				<FormInput
					label='Email'
					name='email'
					type='email'
					value={email}
					onChange={handleChange}
					onBlur={validateEmail}
					error={emailErr}
				/>
				<FormInput
					label='Password'
					name='password'
					type='password'
					value={password}
					onChange={handleChange}
					onBlur={validatePassword}
					error={passwordErr}
				/>
				<div className='md:flex md:items-center mb-12 pl-[120px]'>
					<input
						type='submit'
						value='Login'
						className='bg-cyan-300 border-black border-2 rounded-xl px-14 py-2 font-bold'
					/>
				</div>
			</form>
		</div>
	);
}

export default Login;
