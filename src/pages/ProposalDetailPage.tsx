
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Job, JobApplication } from '@/types/user';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, FileText, User, Calendar, DollarSign } from 'lucide-react';

const ProposalDetailPage = () => {
  const { id, applicationId } = useParams<{ id: string; applicationId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [freelancer, setFreelancer] = useState<any | null>(null);

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
      toast.error('You do not have permission to view this proposal');
      navigate('/dashboard');
      return;
    }
    
    setJob(foundJob);
    
    // Load the specific application
    const storedApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const foundApplication = storedApplications.find((app: JobApplication) => app.id === applicationId);
    
    if (!foundApplication) {
      toast.error('Proposal not found');
      navigate(`/jobs/${id}/applicants`);
      return;
    }
    
    setApplication(foundApplication);
    
    // Load freelancer data
    // In a real app, this would come from the database. For now, we'll create some dummy data
    const dummyFreelancer = {
      id: foundApplication.freelancerId,
      name: `Freelancer ${foundApplication.freelancerId}`,
      role: 'freelancer',
      skills: ['JavaScript', 'React', 'Node.js'],
      bio: 'Experienced developer with 5+ years of experience in web development.',
      hourlyRate: 50,
      experience: [
        {
          id: '1',
          title: 'Senior Developer',
          company: 'Tech Company',
          startDate: '2020-01-01',
          endDate: 'Present',
          description: 'Working on various web development projects.'
        },
        {
          id: '2',
          title: 'Web Developer',
          company: 'Agency',
          startDate: '2018-01-01',
          endDate: '2019-12-31',
          description: 'Developed websites for clients.'
        }
      ]
    };
    
    setFreelancer(dummyFreelancer);
  }, [id, applicationId, navigate, user]);

  const handleStatusChange = (newStatus: 'accepted' | 'rejected') => {
    if (!application) return;
    
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
    setApplication({ ...application, status: newStatus });
    
    toast.success(`Application ${newStatus}`);
  };

  if (!job || !application || !freelancer) {
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
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-4">
            <Link to={`/jobs/${id}/applicants`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applicants
            </Link>
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Proposal Details</h1>
              <p className="text-gray-500">Job: {job.title}</p>
            </div>
            <Badge className={
              application.status === 'accepted' ? 'bg-green-100 text-green-800' : 
              application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''
            }>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
                <CardDescription>The freelancer's proposal for this job</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md mb-6 whitespace-pre-wrap">
                  {application.coverLetter}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">Proposed Amount:</span>
                    <span className="font-semibold">${application.proposedAmount}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">Submitted on:</span>
                    <span className="font-semibold">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {application.status === 'pending' && (
                  <div className="mt-8 flex gap-3 justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => handleStatusChange('rejected')}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Reject Proposal
                    </Button>
                    <Button 
                      onClick={() => handleStatusChange('accepted')}
                    >
                      Accept Proposal
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Freelancer Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                    <p className="text-gray-600">${freelancer.hourlyRate}/hr</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{freelancer.bio}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume
                  </h4>
                  <div className="border rounded p-3 bg-gray-50">
                    {freelancer.experience.map((exp: any) => (
                      <div key={exp.id} className="mb-3">
                        <h5 className="font-medium">{exp.title}</h5>
                        <p className="text-gray-600 text-sm">{exp.company}</p>
                        <p className="text-gray-500 text-xs">
                          {exp.startDate.split('-')[0]} - {exp.endDate === 'Present' ? 'Present' : exp.endDate.split('-')[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link to="/messages">
                    Message Freelancer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProposalDetailPage;
