

// src/app.jsx
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProductPage from "./pages/ProductPage";
import SellPage from "./pages/RentPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import ViewProfile from "./pages/ViewProfilePage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { RentalProvider } from "./store/rentalStore";
import RentCheckoutPage from "./pages/RentCheckoutPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) return <Navigate to="/ProductPage" replace />;
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden">
      {location.pathname !== '/profile' && 
       location.pathname !== '/viewprofile' &&
       location.pathname !== '/login' &&
       location.pathname !== '/signup' &&
       location.pathname !== '/forgot-password' &&
       !location.pathname.startsWith('/reset-password/') && 
       <Navbar />}

      <FloatingShape color="bg-blue-100" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-gray-200" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-gray-100" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <RentalProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/ProductPage"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <SellPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rent"
            element={
              <ProtectedRoute>
                <RentCheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewprofile"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RentalProvider>
      <Toaster />
    </div>
  );
}

export default App;