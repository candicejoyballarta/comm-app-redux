import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import LoginSuccess from './pages/LoginSuccess';
import ManageUsers from './pages/ManageUsers';
import GroupChat from './pages/GroupChat';
import EditUser from './pages/EditUser';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ManageDocuments from './pages/ManageDocuments';
import Share from './pages/Share';
import Logout from './pages/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './route/ProtectedRoutes';
library.add(faXmark, faCaretDown);

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/welcome' element={<Welcome />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/register-success'
						element={<RegisterSuccess />}
					/>
					<Route path='/logout' element={<Logout />} />

					<Route element={<ProtectedRoutes />}>
						<Route path='/' element={<Nav />}>
							<Route index element={<LoginSuccess />} />
							<Route
								path='/users-list'
								element={<ManageUsers />}
							/>
							<Route
								path='/edit-user/:id'
								element={<EditUser />}
							/>
							<Route path='/chat' element={<GroupChat />} />
							<Route
								path='/documents-list'
								element={<ManageDocuments />}
							/>
							<Route path='/share/:id' element={<Share />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
			<ToastContainer position='bottom-center' />
		</>
	);
}

export default App;
