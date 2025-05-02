
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobPostForm } from '@/components/jobs/JobPostForm';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/types/user';

const JobPostPage = () => {
  const navigate = useNavigate();
  
  const handleJobCreated = (job: Job) => {
    // Store the new job in localStorage to persist it
    const existingJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
    localStorage.setItem('postedJobs', JSON.stringify([...existingJobs, job]));
    
    // Navigate to dashboard after successful job creation
    navigate('/dashboard');
  };
  
  return (
    <MainLayout requireAuth={true} allowedRoles={['client']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Post a New Job</h1>
        <JobPostForm onJobCreated={handleJobCreated} />
      </div>
    </MainLayout>
  );
};

export default JobPostPage;
