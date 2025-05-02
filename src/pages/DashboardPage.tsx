
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { FreelancerDashboard } from '@/components/dashboard/FreelancerDashboard';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout requireAuth>
      {user?.role === 'freelancer' ? <FreelancerDashboard /> : <ClientDashboard />}
    </MainLayout>
  );
};

export default DashboardPage;
