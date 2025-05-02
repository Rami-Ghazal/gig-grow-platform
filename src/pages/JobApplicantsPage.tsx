
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Job, JobApplication } from '@/types/user';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const JobApplicantsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  
  useEffect(() => {
    // Load the job
    const storedJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
    const foundJob = storedJobs.find((j: Job) => j.id === id);
    
    if (!foundJob) {
      toast.error('Job not found');
      navigate('/dashboard');
      return;
    }
    
    // Check if user is the client who posted this job
    if (user?.id !== foundJob.clientId) {
      toast.error('You do not have permission to view these applications');
      navigate('/dashboard');
      return;
    }
    
    setJob(foundJob);
    
    // Load applications for this job
    const storedApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const jobApplications = storedApplications.filter((app: JobApplication) => app.jobId === id);
    setApplications(jobApplications);
  }, [id, navigate, user]);

  const handleStatusChange = (applicationId: string, newStatus: 'accepted' | 'rejected') => {
    // Update application status in localStorage
    const storedApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const updatedApplications = storedApplications.map((app: JobApplication) => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    
    localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
    
    // Update state
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
    
    toast.success(`Application ${newStatus}`);
  };

  if (!job) {
    return (
      <MainLayout requireAuth>
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout requireAuth={true} allowedRoles={['client']}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Applications</h1>
            <p className="text-gray-500">Job: {job.title}</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
        
        {applications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-medium mb-2">No applications yet</h2>
              <p className="text-gray-500 mb-4">
                Your job posting hasn't received any applications yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Proposal from Freelancer #{application.freelancerId}
                    </CardTitle>
                    <Badge className={application.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                                    application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Cover Letter</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {application.coverLetter}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">Proposed Amount:</span>
                      <span className="ml-2 font-semibold">${application.proposedAmount}</span>
                    </div>
                    
                    {application.status === 'pending' && (
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusChange(application.id, 'rejected')}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Reject
                        </Button>
                        <Button 
                          onClick={() => handleStatusChange(application.id, 'accepted')}
                        >
                          Accept
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default JobApplicantsPage;
