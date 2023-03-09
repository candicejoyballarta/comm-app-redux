import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, resetUser } from '../features/user/userSlice';
import { deleteUserMessages } from '../features/chat/chatSlice';
import { deleteUserDocument } from '../features/document/documentSlice';
import { Link } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';

const ManageUsers = () => {
	const [userId, setUserId] = useState('');
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const { users, isSuccess, loggedInUser } = useSelector(
		(state) => state.user
	);

	const toggleModal = (id: number) => {
		setUserId(id);
		setShowModal(!showModal);
	};

	const handleDelete = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		// Delete user chat messages
		dispatch(deleteUserMessages(userId));
		// Delete user documents & remove id to shares
		dispatch(deleteUserDocument(userId));
		// Delete user and close modal
		dispatch(deleteUser(userId));
		setShowModal(!showModal);
	};

	return (
		<>
			<h2 className='text-2xl font-bold p-3'>Users</h2>

			<div className='border-2 rounded border-black'>
				<table className='table table-fixed w-full '>
					<thead className='table-header-group bg-gray-300'>
						<tr className='table-row'>
							<td className='table-cell text-left border-r-2 border-black w-2/5 px-2 py-1'>
								Name
							</td>
							<td className='table-cell text-center border-r-2 border-black w-2/5 px-2 py-1'>
								User Email ID
							</td>
							<td className='table-cell text-center border-r-2 w-1/5 px-2 py-1'>
								{' '}
							</td>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr
								className='table-row odd:bg-white even:bg-gray-100'
								key={index}
							>
								<td className='table-cell text-left border-r-2 border-black px-2 py-1'>
									{user.fullName}
								</td>
								<td className='table-cell text-center border-r-2 border-black px-2 py-1'>
									{user.email}
								</td>
								<td className='table-cell text-center px-2 py-1'>
									<Link to={`/edit-user/${user.id}`}>
										Edit{' '}
									</Link>{' '}
									{user.id === loggedInUser.id ? (
										''
									) : (
										<>
											|{' '}
											<button
												onClick={() => {
													toggleModal(user.id);
												}}
											>
												Delete
											</button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<DeleteModal
				title='Confirm User Deletion'
				showModal={showModal}
				toggleModal={toggleModal}
				onDelete={handleDelete}
			/>
		</>
	);
};

export default ManageUsers;
