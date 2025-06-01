import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';

// Components
import MainNavbar from './components/MainNavbar';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';

// User Pages
import WelcomePage from './pages/user/WelcomePage';
import LoginPage from './pages/user/LoginPage';
import SignupPage from './pages/user/SignupPage';
import HomePage from './pages/user/HomePage';
import PopularRoutesPage from './pages/user/PopularRoutesPage';
import FeedbackPage from './pages/user/FeedbackPage';
import BookTicketsPage from './pages/user/BookTicketsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

const AppRoutes = () => {
  const { isAuthenticated, isAdminAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation(); 

  const [authFormType, setAuthFormType] = useState(null);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);

  const hideLayoutPaths = ['/', '/login', '/signup'];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  useEffect(() => {
    if (location.state?.showAuthForm && location.state?.authFormType) {
      showForm(location.state.authFormType, location.state.redirectTo);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const showForm = (type, redirectTo = null) => {
    setAuthFormType(type);
    setRedirectAfterAuth(redirectTo);
  };

  const hideForm = () => {
    setAuthFormType(null);
    setRedirectAfterAuth(null);
  };

  useEffect(() => {
    if (isAuthenticated && redirectAfterAuth) {
      navigate(redirectAfterAuth);
      setRedirectAfterAuth(null);
    }
  }, [isAuthenticated, redirectAfterAuth, navigate]);

  const handleBookTicketsRequest = (redirectTo) => {
    if (!isAuthenticated) {
      showForm('login', redirectTo);
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <>
      {authFormType && (
      <AuthForm
        type={authFormType}
        onClose={hideForm}
        onAuthSuccess={() => {
          hideForm();
          navigate('/home');  // Redirect after successful auth
        }}
      />
    )}

     {!authFormType && (
      <>
        {!hideLayout && <MainNavbar />}

          <Routes>
            {/* User Routes */}
           
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/book-tickets" element={<BookTicketsPage />} />
            <Route path="/routes" element={<PopularRoutesPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />}/>
            <Route path="/dashboard" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

        {!hideLayout && <Footer />}
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
