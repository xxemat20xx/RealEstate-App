import React, { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { Routes, Route } from 'react-router-dom';

//pages
import AdminPanel from './pages/AdminPanel';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {

  return (
    // <AdminPanel />
    <>
       <Navbar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Navbar>
    <Footer />
    </>
 
  )
}

export default App