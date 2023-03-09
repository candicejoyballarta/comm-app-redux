import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {
	return (
		<div className='flex flex-col items-center pt-16 h-screen'>
			<h2 className='text-2xl font-bold'>Registration Successful</h2>

			<p className='pt-10 pb-8'>Thank you for your registration</p>

			<Link
				to='/welcome'
				className='underline decoration-solid text-blue-700'
			>
				Click to return to home page
			</Link>
		</div>
	);
};

export default RegisterSuccess;
