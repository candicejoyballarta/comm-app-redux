import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface User {
	id: number;
	fullName: string;
	email: string;
	password: string;
}

const ProtectedRoutes = () => {
	const loggedInUser = useSelector<RootState, User>(
		(state) => state.user.loggedInUser!
	);
	const location = useLocation();

	return loggedInUser ? (
		<Outlet />
	) : (
		<Navigate to='/welcome' state={{ from: location }} replace />
	);
};

export default ProtectedRoutes;
