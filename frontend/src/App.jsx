import './App.css'
import Login from './components/Login'
import Otp from './components/Otp'
import Register from './components/Register'
import Navbar from './components/Navbar'

import {
  BrowserRouter as Router,
  Routes, 
  Route
}  from 'react-router-dom' ;

function App() {
  

  return (
    <>
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/'  element={<Navbar/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
       
    </>
  )
}

export default App
