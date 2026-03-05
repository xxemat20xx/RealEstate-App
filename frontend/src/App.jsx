import { useAuthStore } from './store/useAuthStore'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

//pages
import AdminPanel from './pages/AdminPanel';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Inquiries from './pages/Inquiries';

// toaster
import { ToastContainer, Bounce } from 'react-toastify';



const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <div>Loading...</div>;

  if (!isAuthenticated || user?.role !== "admin") return <Navigate to="/" />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <div>Loading...</div>;
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;

  return children;
}


const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  
  return (
  <>
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />

    <Navbar />

    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route
        path="/admin-panel"
        element={
          <ProtectedRoutes>
            <AdminPanel />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/inquiries"
        element={
          <RedirectAuthenticatedUser>
            <Inquiries />
          </RedirectAuthenticatedUser>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/reset/:token" element={<ResetPassword />} />
    </Routes>

    <Footer />
  </>
);
}

export default App