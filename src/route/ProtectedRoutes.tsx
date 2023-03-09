import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
	const { loggedInUser } = useSelector((state) => state.user);
	const location = useLocation();

	return loggedInUser ? (
		<Outlet />
	) : (
		<Navigate to='/welcome' state={{ from: location }} replace />
	);
};

export default ProtectedRoutes;
