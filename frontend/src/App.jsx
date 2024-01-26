import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Home from './pages/Home'
import About from './pages/About'
import Workouts from './pages/Workouts'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Workouts" element={<Workouts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
