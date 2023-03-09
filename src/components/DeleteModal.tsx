import React, { useState } from 'react';
import qMark from '../assets/question-mark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DeleteModalProps {
	title: string;
	showModal: boolean;
	toggleModal: () => void;
	onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
	title,
	showModal,
	toggleModal,
	onDelete,
}) => {
	return (
		<>
			{showModal && (
				<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none '>
					<div
						id='delete-modal'
						className='flex flex-col border-2 border-black rounded w-72 bg-white'
					>
						<div className='flex justify-end space-x-8 border-b-2 border-black'>
							<span className='px-2 py-0.5'>{title}</span>
							<span
								className='border-2 border-black rounded justify-center px-1 my-0.5'
								id='user-close'
								onClick={toggleModal}
							>
								<FontAwesomeIcon
									icon={['fas', 'xmark']}
									fontSize='20'
								/>
							</span>
						</div>
						<form onSubmit={onDelete}>
							<div className='flex flex-row pt-12 pb-6 px-4'>
								<img
									src={qMark}
									alt='question mark'
									className='w-8'
								/>
								<p className='pl-4'>
									<b>Are you Sure ?</b>
								</p>
							</div>
							<div className='flex flex-row justify-center items-center py-4 space-x-4'>
								<input
									type='submit'
									value='ok'
									className='border-2 border-black rounded-lg hover:border-indigo-700 px-6'
								/>
								<input
									type='button'
									value='Cancel'
									className='border-2 border-black rounded-lg hover:border-indigo-700 px-6'
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

export default DeleteModal;
