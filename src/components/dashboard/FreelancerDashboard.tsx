import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ArrowRight, Search } from 'lucide-react';
import { Job, JobApplication } from '@/types/user';

// Mock data for freelancer dashboard
const recentJobs = [
  {
    id: '1',
    title: 'WordPress Developer Needed',
    budget: { min: 500, max: 1000 },
    skills: ['WordPress', 'PHP', 'JavaScript'],
    deadline: '2025-06-01',
    category: 'Web Development',
    status: 'open',
  },
  {
    id: '2',
    title: 'Logo Design for Tech Startup',
    budget: { min: 300, max: 500 },
    skills: ['Logo Design', 'Brand Identity', 'Adobe Illustrator'],
    deadline: '2025-05-20',
    category: 'Design',
    status: 'open',
  }
];

const applications = [
  {
    id: '101',
    jobId: '1',
    jobTitle: 'WordPress Developer Needed',
    proposedAmount: 750,
    status: 'pending',
    createdAt: '2025-05-01',
  },
  {
    id: '102',
    jobId: '3',
    jobTitle: 'Mobile App UI Design',
    proposedAmount: 950,
    status: 'accepted',
    createdAt: '2025-04-25',
  }
];

export const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load applications from localStorage
    const storedApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const storedJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
    
    if (storedApplications.length > 0 && user) {
      // Filter applications by current freelancer
      const userApplications = storedApplications
        .filter((app: JobApplication) => app.freelancerId === user.id)
        .map((app: JobApplication) => {
          // Find the associated job
          const job = storedJobs.find((j: Job) => j.id === app.jobId) || { title: 'Unknown Job' };
          
          return {
            id: app.id,
            jobId: app.jobId,
            jobTitle: job.title,
            proposedAmount: app.proposedAmount,
            status: app.status,
            createdAt: app.createdAt,
          };
        });
      
      setApplications(userApplications.length > 0 ? userApplications : []);
    }
    
    // Load recommended jobs
    if (storedJobs.length > 0) {
      setRecommendedJobs(storedJobs.slice(0, 2));
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your freelance work</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/jobs">
              <Search className="mr-2 h-4 w-4" />
              Browse Jobs
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Job Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{applications.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Completed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$1,250</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>
              Track the status of your job applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex justify-between items-center p-4 border rounded-lg hover-card-effect">
                    <div>
                      <h3 className="font-medium">{app.jobTitle}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={app.status === 'accepted' ? 'default' : 'secondary'}>
                          {app.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          ${app.proposedAmount}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/applications/${app.id}`}>
                        View <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No applications yet</h3>
                <p className="text-muted-foreground">
                  Start applying to jobs to grow your freelance career
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
            <CardDescription>
              Jobs that match your skills and experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg hover-card-effect">
                  <h3 className="font-medium">
                    <Link to={`/jobs/${job.id}`} className="hover:text-primary">
                      {job.title}
                    </Link>
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="category-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm font-medium">
                      ${job.budget.min} - ${job.budget.max}
                    </span>
                    <Button size="sm" asChild>
                      <Link to={`/jobs/${job.id}`}>View Job</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
