import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadDocument } from '../features/document/documentSlice';
import isObjectEmpty from '../utils/isObjectEmpty';

interface UploadModalProps {
	title: string;
	loggedIn: number;
	showModal: boolean;
	toggleModal: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
	title,
	loggedIn,
	showModal,
	toggleModal,
}) => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		label: '',
		fileName: '',
	});
	const [formErr, setFormErr] = useState({
		labelErr: '',
		fileErr: '',
	});

	const { label, fileName } = formData;
	const { labelErr, fileErr } = formErr;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		if (e.target.name === 'fileName') {
			if (e.target.files.length > 0) {
				setFormData({
					...formData,
					[e.target.name]: e.target.files[0].name,
				});
			} else {
				setFormData({
					...formData,
					[e.target.name]: '',
				});
			}
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const validateLabel = () => {
		if (!formData.label.trim()) {
			setFormErr({ ...formErr, labelErr: 'File label is required' });
			return false;
		} else {
			setFormErr({ ...formErr, labelErr: '' });
			return true;
		}
	};

	const validateFile = () => {
		if (!formData.fileName.trim()) {
			setFormErr({ ...formErr, fileErr: 'File is required' });
			return false;
		} else {
			setFormErr({ ...formErr, fileErr: '' });
			return true;
		}
	};

	const handleUpload = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		const isDataEmpty = isObjectEmpty(formData);

		if (isDataEmpty) {
			setFormErr({
				labelErr: 'Label is required',
				fileErr: 'Please upload a file',
			});
		}

		const validation = isObjectEmpty(formErr);

		if (!isDataEmpty && validation) {
			const document = {
				fileId: Math.floor(Math.random() * 999),
				fileName,
				label,
				userId: loggedIn,
				sharedIds: [],
			};

			dispatch(uploadDocument(document));
			toggleModal();
			setFormData({
				label: '',
				fileName: '',
			});
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
						<form onSubmit={handleUpload}>
							<div className='flex justify-end pt-8 pb-2 px-4 space-x-14'>
								<label className='font-bold'>Label</label>
								<input
									type='text'
									name='label'
									value={formData.label}
									onChange={handleChange}
									onBlur={validateLabel}
									className='border-2 border-black rounded w-80'
								/>
							</div>
							{labelErr ? (
								<p className='text-red-500 text-xs italic p-1 pl-48 '>
									{labelErr}
								</p>
							) : (
								''
							)}

							<div className='flex justify-end p-4 space-x-4'>
								<label className='font-bold'>File Upload</label>
								<input
									type='file'
									name='fileName'
									id='fileName'
									onChange={handleChange}
									onBlur={validateFile}
								/>
							</div>
							{fileErr ? (
								<p className='text-red-500 text-xs italic p-1 pl-48 '>
									{fileErr}
								</p>
							) : (
								''
							)}

							<div className='flex items-center space-x-6 py-4 px-8'>
								<input
									type='submit'
									value='Upload Now'
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

export default UploadModal;
