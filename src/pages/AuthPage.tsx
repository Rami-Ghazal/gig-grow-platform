
import React from 'react';
import { AuthTabs } from '@/components/auth/AuthTabs';
import { MainLayout } from '@/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-md">
        <AuthTabs />
      </div>
    </MainLayout>
  );
};

export default AuthPage;
