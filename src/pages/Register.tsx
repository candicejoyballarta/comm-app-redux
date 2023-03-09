import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { register, resetUser } from '../features/user/userSlice';
import checkEmail from '../utils/checkEmail';
import isObjectEmpty from '../utils/isObjectEmpty';

function Register() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
	});
	const [confirmPassword, setConfirmPassword] = useState('');

	const [formErrors, setFormErrors] = useState({
		fullNameErr: '',
		emailErr: '',
		passwordErr: '',
		confirmErr: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { users, isSuccess, loggedInUser } = useSelector(
		(state) => state.user
	);

	const { fullName, email, password } = formData;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateName = () => {
		if (!fullName.trim()) {
			setFormErrors({ ...formErrors, fullNameErr: 'Name is required' });
			return false;
		} else {
			setFormErrors({ ...formErrors, fullNameErr: '' });
			return true;
		}
	};

	const validateEmail = () => {
		let isValidEmail = checkEmail(formData.email);

		if (!email) {
			setFormErrors({ ...formErrors, emailErr: 'Email is required' });
			return false;
		} else if (!isValidEmail) {
			setFormErrors({ ...formErrors, emailErr: 'Email is invalid' });
			return false;
		} else {
			setFormErrors({ ...formErrors, emailErr: '' });
			return true;
		}
	};

	const validatePassword = () => {
		if (!password.trim()) {
			setFormErrors({
				...formErrors,
				passwordErr: 'Password is required',
			});
			return false;
		} else if (formData.password.length < 8) {
			setFormErrors({
				...formErrors,
				passwordErr: 'Password must be at least 8 characters',
			});
			return false;
		} else if (formData.password !== confirmPassword) {
			setFormErrors({
				...formErrors,
				confirmErr: 'Password does not match',
			});
			return false;
		} else {
			setFormErrors({ ...formErrors, passwordErr: '' });
			return true;
		}
	};

	const validateConfirm = () => {
		if (!confirmPassword.trim()) {
			setFormErrors({
				...formErrors,
				confirmErr: 'Please confirm password',
			});
			return false;
		} else if (formData.password !== confirmPassword) {
			setFormErrors({
				...formErrors,
				confirmErr: 'Password does not match',
			});
			return false;
		} else {
			setFormErrors({
				...formErrors,
				confirmErr: '',
			});
			return true;
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let hasError = false;

		for (let i = 0; i < users.length; i++) {
			// Check if user exist on storage
			if (users[i].email === formData.email) {
				setFormErrors({
					...formErrors,
					emailErr: 'Email already used!',
				});
				hasError = true;
			}
		}

		const isDataEmpty = isObjectEmpty(formData);

		if (isDataEmpty) {
			setFormErrors({
				fullNameErr: 'Name is required',
				emailErr: 'Email is required',
				passwordErr: 'Password is required',
				confirmErr: 'Please confirm password',
			});
		}

		const validation = isObjectEmpty(formErrors);

		if (!hasError && !isDataEmpty && validation) {
			let userID = Math.floor(Date.now() * Math.random());

			// User input in JSON
			const userData = {
				id: userID,
				fullName: formData.fullName,
				email: formData.email,
				password: formData.password,
			};

			dispatch(register(userData));
		}
	};

	useEffect(() => {
		if (isSuccess || loggedInUser !== null) {
			navigate('/register-success');
		}

		dispatch(resetUser());
	}, [isSuccess, loggedInUser, dispatch]);

	return (
		<div className='flex flex-col items-center pt-14 h-screen'>
			<h1 className='text-2xl font-bold'>Register</h1>
			<form onSubmit={handleSubmit} className='items-center pt-10 pr-24'>
				<FormInput
					label='Full Name'
					name='fullName'
					type='text'
					value={fullName}
					onChange={handleChange}
					onBlur={validateName}
					error={formErrors.fullNameErr}
				/>
				<FormInput
					label='Email'
					name='email'
					type='email'
					value={email}
					onChange={handleChange}
					onBlur={validateEmail}
					error={formErrors.emailErr}
				/>
				<FormInput
					label='Password'
					name='password'
					type='password'
					value={password}
					onChange={handleChange}
					onBlur={validatePassword}
					error={formErrors.passwordErr}
				/>
				<FormInput
					label='Confirm Password'
					name='confirmPassword'
					type='password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					onBlur={validateConfirm}
					error={formErrors.confirmErr}
				/>
				<div className='md:flex md:items-center md:justify-center mb-12 pl-[96px]'>
					<input
						type='submit'
						value='Register'
						className='bg-cyan-300 border-black border-2 rounded-xl px-14 py-2 font-bold'
					/>
				</div>
			</form>
		</div>
	);
}

export default Register;
