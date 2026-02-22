import React, { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'

//pages
import AdminPanel from './pages/AdminPanel';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

const App = () => {

  return (
    // <AdminPanel />
    <Navbar>
    <Homepage />
    </Navbar>
    
  )
}

export default App