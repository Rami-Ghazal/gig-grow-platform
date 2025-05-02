
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: Array<'client' | 'freelancer'>;
}

export const MainLayout = ({ 
  children, 
  requireAuth = false,
  allowedRoles = ['client', 'freelancer']
}: MainLayoutProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Redirect if user role is not allowed
  if (requireAuth && isAuthenticated && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
