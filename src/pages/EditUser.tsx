import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser, resetUser } from '../features/user/userSlice';
import FormInput from '../components/FormInput';
import checkEmail from '../utils/checkEmail';

const EditUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let { id: userId } = useParams();

	const { users, isSuccess, loggedInUser } = useSelector(
		(state) => state.user
	);

	const userToEdit = users.find(({ id }) => id === +userId);

	const [fullName, setFullName] = useState(userToEdit.fullName);
	const [email, setEmail] = useState(userToEdit.email);
	const [fullNameError, setFullNameError] = useState('');
	const [emailError, setEmailError] = useState('');

	const validateName = () => {
		if (!fullName || !fullName.trim()) {
			setFullNameError('Name is required');
		} else {
			setFullNameError('');
		}
	};

	const validateEmail = () => {
		let isValidEmail = checkEmail(email);

		const filterEmails = users.filter(
			(user) => user.email !== userToEdit.email
		);
		const takenEmails = filterEmails.map((u) => u.email);
		const isEmailTaken = takenEmails.includes(email);

		if (!email || !email.trim()) {
			setEmailError('Email is required');
		} else if (!isValidEmail) {
			setEmailError('Email is invalid');
		} else if (isEmailTaken === true) {
			setEmailError('Email is already taken');
		} else {
			setEmailError('');
		}
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!fullNameError && !emailError) {
			const data = {
				fullName,
				email,
			};
			dispatch(updateUser({ id: userId, fullName, email }));
		}
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/users-list');
		}

		dispatch(resetUser());
	}, [isSuccess]);

	return (
		<div className='flex flex-col items-center pt-8 h-screen'>
			<h2 className='text-2xl font-semibold mb-9'>
				Edit User Information
			</h2>
			<form onSubmit={handleSubmit} className='items-center pt-4 pr-24'>
				<FormInput
					label='Full Name'
					name='fullName'
					type='text'
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					onBlur={validateName}
					error={fullNameError}
				/>
				<FormInput
					label='Email'
					name='email'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onBlur={validateEmail}
					error={emailError}
				/>

				<div className='md:flex md:items-center mb-12 pl-[120px]'>
					<input
						type='submit'
						value='Save'
						className='bg-cyan-300 border-black border-2 rounded-xl px-14 py-2 font-bold'
					/>
				</div>
			</form>
		</div>
	);
};

export default EditUser;
