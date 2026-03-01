import { useAuthStore } from './store/useAuthStore'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

//pages
import AdminPanel from './pages/AdminPanel';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';

// toaster
import { ToastContainer, Bounce } from 'react-toastify';



const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user, checkAuth, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated || user?.role !== "admin") return <Navigate to="/" />;

  return children;
};


const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  
  return (
    // <AdminPanel />
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

       <Navbar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin-panel" element={
          <ProtectedRoutes>
            <AdminPanel />
          </ProtectedRoutes>
        } />
        <Route
          path="/login"
          element={<Login/>}
        />
      </Routes>
    </Navbar>
    <Footer />
    </>
 
  )
}

export default App