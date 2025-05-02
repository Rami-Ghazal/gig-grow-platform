
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobPostForm } from '@/components/jobs/JobPostForm';

const JobPostPage = () => {
  return (
    <MainLayout requireAuth={true} allowedRoles={['client']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Post a New Job</h1>
        <JobPostForm />
      </div>
    </MainLayout>
  );
};

export default JobPostPage;
