import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages & components
import Home from './pages/Home'
import About from './pages/About'
import Workouts from './pages/Workouts'
import NavBar from './components/NavBar'
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user } = useAuthContext()

  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Workouts" element={user ? <Workouts /> : <Navigate to={'/login'} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to={'/'} />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to={'/'} />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to={'/login'} />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer theme='colored' />
    </div>
  );
}

export default App;
