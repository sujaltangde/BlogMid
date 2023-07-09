import './assests/Style.css'
import { Layout } from './components/Layout';



import {
	Route,
	Routes
} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import { CreatePost } from './pages/CreatePost';
import { PostPage } from './pages/PostPage';
import { EditPost } from './pages/EditPost';
// import { EditPosts } from './pages/EditPosts';


function App() {
	return (
		<>
			<UserContextProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />} >

						<Route index element={<IndexPage />} />

						<Route path={'/login'} element={<LoginPage />} />

						<Route path={'/register'} element={<RegisterPage />} />

						<Route path={'/create'} element={<CreatePost/>} />

						<Route path={'/post/:id'} element={<PostPage/>} />

						<Route path={"/edit/:id"} element={<EditPost/>} />

					</Route>

				</Routes>
			</Router>			</UserContextProvider>
		</>
	);
}

export default App;
