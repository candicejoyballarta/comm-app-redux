import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../features/user/userSlice';

const Nav = () => {
	const dispatch = useDispatch();

	const logOutUser = () => {
		dispatch(logout());
	};

	return (
		<>
			<nav className='border-black border-2 rounded-md grid grid-cols-4'>
				<NavLink
					to='/chat'
					className={({ isActive }) =>
						isActive
							? 'flex flex-nowrap justify-center items-center h-14 text-lg border-r-2 border-black '
							: 'flex flex-nowrap justify-center items-center h-14 text-lg border-r-2 border-black bg-gray-300 hover:bg-gray-200'
					}
				>
					Group Chat
				</NavLink>
				<NavLink
					to='/users-list'
					className={({ isActive }) =>
						isActive
							? 'flex flex-nowrap justify-center items-center h-14 text-lg border-r-2 border-black '
							: 'flex flex-nowrap justify-center items-center h-14 text-lg border-r-2 border-black bg-gray-300 hover:bg-gray-200'
					}
				>
					Manage Users
				</NavLink>
				<NavLink
					to='/documents-list'
					className={({ isActive }) =>
						isActive
							? 'flex flex-nowrap justify-center items-center h-14 text-lg border-r-2 border-black '
							: 'flex flex-nowrap justify-center items-center h-14 text-lg border-r-2 border-black bg-gray-300 hover:bg-gray-200'
					}
				>
					Manage Documents
				</NavLink>
				<NavLink
					onClick={logOutUser}
					to='/logout'
					className='flex flex-nowrap justify-center items-center h-14 text-lg bg-gray-300 hover:bg-gray-200'
				>
					Logout
				</NavLink>
			</nav>
			<Outlet />
		</>
	);
};

export default Nav;
