import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDocument } from '../features/document/documentSlice';
import DeleteModal from '../components/DeleteModal';
import UploadModal from '../components/UploadModal';
import EditModal from '../components/EditModal';
import { RootState } from '../app/store';

interface Document {
	fileId: number;
	fileName: string;
	label: string;
	userId: number;
	sharedIds: number[];
}

interface User {
	id: number;
	fullName: string;
	email: string;
	password: string;
}

const ManageDocuments = () => {
	const [fileId, setFileId] = useState<number | null>(null);
	const [initLabel, setInitLabel] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

	const dispatch = useDispatch();

	const documents = useSelector<RootState, Document[]>(
		(state) => state.document.documents
	);

	const users = useSelector<RootState, User[]>((state) => state.user.users);
	const loggedInUser = useSelector<RootState, User>(
		(state) => state.user.loggedInUser!
	);

	const toggleUploadModal = () => {
		setShowUploadModal(!showUploadModal);
	};

	const toggleEditModal = () => {
		setShowEditModal(!showEditModal);
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const loggedIn = loggedInUser.id;

	const handleDelete = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		dispatch(deleteDocument(fileId!));
		setShowModal(!showModal);
	};

	return (
		<>
			<div className='z-20'>
				<div id='uploads'>
					<h2 className='text-2xl font-bold p-3 mb-3'>My Uploads</h2>
					<div className='border-2 rounded border-black'>
						<table className='table table-fixed w-full '>
							<thead className='table-header-group bg-gray-300'>
								<tr className='table-row'>
									<td className='table-cell text-left border-r-2 border-black w-2/5 px-2 py-1'>
										Label
									</td>
									<td className='table-cell text-center border-r-2 border-black w-2/5 px-2 py-1'>
										File Name
									</td>
									<td className='table-cell text-center border-r-2 w-1/5 px-2 py-1'>
										Action
									</td>
								</tr>
							</thead>
							<tbody>
								{documents.map((file, index) => {
									let row;
									if (file.userId === loggedInUser.id) {
										row = (
											<tr
												className='table-row odd:bg-white even:bg-gray-100'
												key={index}
											>
												<td className='table-cell text-left border-r-2 border-black px-2 py-1'>
													{file.label}
												</td>
												<td className='table-cell text-center border-r-2 border-black px-2 py-1'>
													{file.fileName}
												</td>
												<td className='table-cell text-center px-2 py-1'>
													<button
														onClick={() => {
															setFileId(
																file.fileId
															);
															setInitLabel(
																file.label
															);
															toggleEditModal();
														}}
													>
														Edit
													</button>{' '}
													|{' '}
													<button
														onClick={() => {
															setFileId(
																file.fileId
															);
															toggleModal();
														}}
													>
														Delete
													</button>{' '}
													|{' '}
													<Link
														to={`/share/${file.fileId}`}
													>
														Share
													</Link>
												</td>
											</tr>
										);
									}
									return row;
								})}
							</tbody>
						</table>
					</div>
				</div>

				<div id='shared'>
					<h2 className='text-2xl font-bold p-3 mb-3'>
						Shared Uploads
					</h2>
					<div className='border-2 rounded border-black'>
						<table className='table table-fixed w-full '>
							<thead className='table-header-group bg-gray-300'>
								<tr className='table-row'>
									<td className='table-cell text-left border-r-2 border-black w-2/5 px-2 py-1'>
										Label
									</td>
									<td className='table-cell text-center border-r-2 border-black w-2/5 px-2 py-1'>
										File Name
									</td>
									<td className='table-cell text-center border-r-2 w-1/5 px-2 py-1'>
										Shared by
									</td>
								</tr>
							</thead>
							<tbody>
								{documents.map((file, index) => {
									let row;
									let shareIds = file.sharedIds.some(
										(user) => user === loggedInUser.id
									);
									if (shareIds) {
										let docsOwner = users.find(
											({ id }) => id === file.userId
										);
										row = (
											<tr
												className='table-row odd:bg-white even:bg-gray-100'
												key={index}
											>
												<td className='table-cell text-left border-r-2 border-black px-2 py-1'>
													{file.label}
												</td>
												<td className='table-cell text-center border-r-2 border-black px-2 py-1'>
													{file.fileName}
												</td>
												<td className='table-cell text-center px-2 py-1'>
													{docsOwner?.email}
												</td>
											</tr>
										);
									}
									return row;
								})}

								<tr className='table-row odd:bg-white even:bg-gray-100'>
									<td className='table-cell text-left border-r-2 border-black px-2 py-1'>
										<button
											className='border-2 border-black rounded bg-cyan-300 pl-1 pr-8'
											onClick={toggleUploadModal}
										>
											+ Add Upload
										</button>
									</td>
									<td className='table-cell text-center border-r-2 border-black px-2 py-1'>
										&nbsp;
									</td>
									<td className='table-cell text-center px-2 py-1'>
										&nbsp;
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<DeleteModal
				title='Confirm File Deletion'
				showModal={showModal}
				toggleModal={toggleModal}
				onDelete={handleDelete}
			/>

			{initLabel && (
				<EditModal
					title='Edit'
					fileId={fileId!}
					initialLabel={initLabel}
					showModal={showEditModal}
					toggleModal={toggleEditModal}
				/>
			)}

			<UploadModal
				title='Upload'
				loggedIn={loggedIn}
				showModal={showUploadModal}
				toggleModal={toggleUploadModal}
			/>
		</>
	);
};

export default ManageDocuments;
