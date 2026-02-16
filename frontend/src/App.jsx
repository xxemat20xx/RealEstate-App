import React, { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'

//pages
import AdminPanel from './pages/AdminPanel';

const App = () => {
  // const { user, isAuthenticated, isLoading, error, login, logout, checkAuth } = useAuthStore();
  // useEffect(() => {
  //   checkAuth();
  // }, []);
  
  // if(isLoading){
  //   return <div>Loading...</div>
  // }

  return (
    <AdminPanel />
  )
}

export default App