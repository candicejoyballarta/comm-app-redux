import React from 'react';

interface FormInputProps {
	label: string;
	name: string;
	type: string;
	value?: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
	label,
	name,
	type,
	value,
	onChange,
	onBlur,
	error,
}) => {
	return (
		<div className='md:flex md:items-center mb-10'>
			<div className='w-2/4 md:w-1/3'>
				<label className='block font-bold md:text-right mb-1 md:mb-0 pr-4'>
					{label}
				</label>
			</div>
			<div className='w-2/4 md:w-2/3'>
				<input
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className={`appearance-none border-2 border-black ${
						error ? 'border-red-500 animate-shake' : 'animate-none'
					} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500`}
				/>
				{error && (
					<p className='text-red-500 text-xs italic p-1 animate-shake'>
						{error}
					</p>
				)}
			</div>
		</div>
	);
};

export default FormInput;
