import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editDocument } from '../features/document/documentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface EditModalProps {
	title: string;
	fileId: number;
	initialLabel: string;
	showModal: boolean;
	toggleModal: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
	title,
	fileId,
	initialLabel,
	showModal,
	toggleModal,
}) => {
	const [label, setLabel] = useState(initialLabel);
	const [labelErr, setLabelErr] = useState('');

	const dispatch = useDispatch();

	const validateLabel = () => {
		if (!label.trim()) {
			setLabelErr('File label is required');
			return false;
		} else {
			setLabelErr('');
			return true;
		}
	};

	const onUpdate = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (!labelErr) {
			dispatch(editDocument({ fileId, label }));
			toggleModal();
		}
	};

	return (
		<>
			{showModal && (
				<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
					<div
						id='upload-modal'
						className='flex flex-col border-2 border-black rounded w-[33em] bg-white'
					>
						<div className='flex justify-end border-b-2 border-black'>
							<span className='w-full text-center font-bold px-2 py-0.5'>
								{title}
							</span>
							<span
								className='flex border-2 border-black rounded justify-center px-1 my-0.5'
								id='upload-close'
								onClick={toggleModal}
							>
								<FontAwesomeIcon
									icon={['fas', 'xmark']}
									fontSize='20'
								/>
							</span>
						</div>
						<form onSubmit={onUpdate} className='h-48'>
							<div className='flex justify-end p-4 space-x-20'>
								<label className='font-bold'>Label</label>
								<input
									type='text'
									name='label'
									value={label}
									onBlur={validateLabel}
									className='border-2 border-black rounded w-80'
									onChange={(e) => setLabel(e.target.value)}
								/>
							</div>
							{labelErr ? (
								<p className='text-red-500 text-xs italic p-1 pl-48'>
									{labelErr}
								</p>
							) : (
								''
							)}

							<div className='flex space-x-6 py-4 mx-48'>
								<input
									type='submit'
									value='Save'
									id='upload-btn'
									className='border-2 border-black rounded-xl py-1 px-3 bg-gray-300 font-bold'
								/>
								<input
									type='button'
									value='Cancel'
									id='upload-cancel'
									className='border-2 border-black rounded-xl py-1 px-6 bg-gray-300 font-bold'
									onClick={toggleModal}
								/>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default EditModal;
