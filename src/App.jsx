import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Customize from './pages/Customize'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/customize" element={<Customize />} />
      </Routes>
    </Router>
  )
}

export default App

