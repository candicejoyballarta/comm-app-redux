import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { shareDocument, removeShare } from '../features/document/documentSlice';
import DeleteModal from '../components/DeleteModal';

const Share = () => {
	const dispatch = useDispatch();
	let { id } = useParams();
	const [showModal, setShowModal] = useState(false);

	const { documents } = useSelector((state) => state.document);
	const { users, loggedInUser } = useSelector((state) => state.user);

	const fileToShare = documents.find(({ fileId }) => fileId === +id);

	const [selected, setSelected] = useState('');
	const [shareId, setShareId] = useState('');
	const [selectedErr, setSelectedErr] = useState('');

	const toggleModal = (id: number) => {
		setShareId(id);
		setShowModal(!showModal);
	};

	const validateSelect = () => {
		if (!selected || selected === '-- Select User --' || selected === '0') {
			setSelectedErr('Please select a user');
		} else {
			setSelectedErr('');
		}
	};

	const handleShare = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (selected && !selectedErr && selected !== null && selected !== '0') {
			dispatch(shareDocument({ id, selected }));
			setSelected('');
		} else {
			setSelectedErr('Please select a user');
		}
	};

	const handleRemove = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		dispatch(removeShare({ id, shareId }));
		setSelected('');
		setShowModal(!showModal);
	};
	return (
		<>
			<div id='uploads'>
				<div className='flex flex-row'>
					<h2 className='text-2xl font-bold py-3 mb-3'>
						Upload Sharing:{' '}
					</h2>
					<p className='text-2xl py-3 px-3 mb-3'>
						{fileToShare.fileName}
					</p>
				</div>
				<div className='border-2 rounded border-black'>
					<table className='table table-fixed w-full '>
						<thead className='table-header-group bg-gray-300'>
							<tr className='table-row'>
								<td className='table-cell text-left border-r-2 border-black w-2/5 px-2 py-1'>
									Shared User
								</td>
								<td className='table-cell text-center border-r-2 border-black w-2/5 px-2 py-1'>
									Action
								</td>
							</tr>
						</thead>
						<tbody>
							{fileToShare.sharedIds?.length > 0 ? (
								fileToShare.sharedIds.map((userId, index) => {
									let userSharedTo = users.find(
										({ id }) => id === userId
									);
									return (
										<tr
											className='table-row odd:bg-white even:bg-gray-100'
											key={index}
										>
											<td className='table-cell text-left border-r-2 border-black px-2 py-1'>
												{userSharedTo.fullName}
											</td>
											<td className='table-cell text-center border-black px-2 py-1'>
												<button
													onClick={() => {
														toggleModal(
															userSharedTo.id
														);
													}}
												>
													Remove
												</button>
											</td>
										</tr>
									);
								})
							) : (
								<tr className='text-center'>
									<td colSpan={2}>File not shared yet</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<div id='add-share'>
				<h2 className='text-2xl font-bold py-3 mb-3'>Add Sharing</h2>
				<div className='border-2 border-black rounded'>
					<form onSubmit={handleShare} className='flex space-x-2'>
						<div className='flex items-center py-4 pl-12 pr-8 space-x-4'>
							<label className='font-bold '>Choose User:</label>
							<div className='select-wrap'>
								<select
									name='user'
									id='share-users'
									onChange={(e) =>
										setSelected(e.target.value)
									}
									onBlur={validateSelect}
									defaultValue={0}
								>
									<option value={0}>-- Select user --</option>
									{users.map((user, index) => {
										let option;
										if (
											user.id !== loggedInUser.id &&
											!fileToShare.sharedIds?.includes(
												user.id
											)
										) {
											option = (
												<option
													key={index}
													value={user.id}
												>
													{user.fullName}
												</option>
											);
										}
										return option;
									})}
								</select>
							</div>
						</div>
						<div className='flex items-center'>
							<button className='border-2 border-black rounded-xl bg-gray-300 py-1 px-8'>
								Add Share
							</button>
							{selectedErr ? (
								<p className='text-red-500 text-xs italic p-1 pl-8'>
									{selectedErr}
								</p>
							) : (
								''
							)}
						</div>
					</form>
				</div>
			</div>
			<DeleteModal
				title='Confirm File Deletion'
				showModal={showModal}
				toggleModal={toggleModal}
				onDelete={handleRemove}
			/>
		</>
	);
};

export default Share;
