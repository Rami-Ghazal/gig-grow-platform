
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ArrowRight, Plus } from 'lucide-react';

// Mock data for client dashboard
const postedJobs = [
  {
    id: '1',
    title: 'WordPress Developer Needed',
    budget: { min: 500, max: 1000 },
    applicantsCount: 5,
    deadline: '2025-06-01',
    status: 'open',
    createdAt: '2025-05-01',
  },
  {
    id: '2',
    title: 'Logo Design for Tech Startup',
    budget: { min: 300, max: 500 },
    applicantsCount: 12,
    deadline: '2025-05-20',
    status: 'open',
    createdAt: '2025-04-28',
  }
];

const recentApplicants = [
  {
    id: '201',
    jobId: '1',
    jobTitle: 'WordPress Developer Needed',
    freelancerId: '101',
    freelancerName: 'John Freelancer',
    skills: ['WordPress', 'PHP', 'JavaScript'],
    proposedAmount: 750,
    status: 'pending',
    createdAt: '2025-05-01',
  },
  {
    id: '202',
    jobId: '2',
    jobTitle: 'Logo Design for Tech Startup',
    freelancerId: '102',
    freelancerName: 'Sarah Designer',
    skills: ['Logo Design', 'Branding', 'Illustration'],
    proposedAmount: 450,
    status: 'pending',
    createdAt: '2025-04-29',
  }
];

export const ClientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Manage your projects and find talent</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/post-job">
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{postedJobs.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">New Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recentApplicants.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Ongoing Projects</CardTitle>
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
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Posted Jobs</CardTitle>
            <CardDescription>
              Manage your job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {postedJobs.length > 0 ? (
              <div className="space-y-4">
                {postedJobs.map((job) => (
                  <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg hover-card-effect">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary">
                          {job.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {job.applicantsCount} applicants
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/jobs/${job.id}/applicants`}>
                        View <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No jobs posted yet</h3>
                <p className="text-muted-foreground">
                  Post your first job to find the perfect freelancer
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/post-job">Post a Job</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Proposals</CardTitle>
            <CardDescription>
              Review applications from freelancers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplicants.map((app) => (
                <div key={app.id} className="p-4 border rounded-lg hover-card-effect">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{app.freelancerName}</h3>
                    <Badge variant="outline">${app.proposedAmount}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Applied for: {app.jobTitle}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {app.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="category-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" asChild>
                      <Link to={`/jobs/${app.jobId}/applicants/${app.id}`}>View Proposal</Link>
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
