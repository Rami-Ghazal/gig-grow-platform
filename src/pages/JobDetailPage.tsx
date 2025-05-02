
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobApplicationForm } from '@/components/jobs/JobApplicationForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Job } from '@/types/user';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, DollarSign, Clock } from 'lucide-react';

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    clientId: '201',
    title: 'WordPress Developer Needed for E-commerce Site',
    description: 'We need an experienced WordPress developer to build a custom e-commerce website with WooCommerce. The site should have a modern design, be fully responsive, and include custom product filtering options.\n\nResponsibilities:\n- Design and develop a custom WordPress theme\n- Implement WooCommerce with custom product types\n- Set up payment gateways and shipping options\n- Optimize the site for performance and SEO\n- Provide documentation and training\n\nRequirements:\n- 3+ years of WordPress development experience\n- Strong understanding of PHP, JavaScript, and CSS\n- Experience with WooCommerce and custom plugin development\n- Portfolio of previous e-commerce projects',
    budget: { min: 500, max: 1000 },
    skills: ['WordPress', 'PHP', 'JavaScript', 'WooCommerce', 'CSS'],
    category: 'Web Development',
    deadline: '2025-06-01',
    createdAt: '2025-05-01',
    status: 'open',
  },
  {
    id: '2',
    clientId: '202',
    title: 'Logo Design for Tech Startup',
    description: 'We are a new tech startup looking for a professional logo design that represents our innovative approach to AI solutions. We need both logo files and brand guidelines.\n\nDeliverables:\n- Primary logo in multiple formats (PNG, SVG, AI)\n- Logo variations (horizontal, vertical, icon-only)\n- Color palette and typography guidelines\n- Brand usage examples\n\nRequirements:\n- Experience designing logos for tech companies\n- Understanding of modern, clean design principles\n- Ability to create a logo that works well at different sizes\n- Portfolio of previous logo design work',
    budget: { min: 300, max: 500 },
    skills: ['Logo Design', 'Brand Identity', 'Adobe Illustrator', 'Branding', 'Typography'],
    category: 'Design',
    deadline: '2025-05-20',
    createdAt: '2025-04-28',
    status: 'open',
  },
];

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, fetch job by ID from the server
    const foundJob = mockJobs.find(j => j.id === id);
    setJob(foundJob || null);
  }, [id]);
  
  if (!job) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Job not found</h1>
            <Button onClick={() => navigate('/jobs')}>
              Back to Jobs
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    setShowApplicationForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const postedDate = new Date(job.createdAt);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  return (
    <MainLayout requireAuth={false}>
      <div className="container mx-auto px-4 py-8">
        {showApplicationForm ? (
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowApplicationForm(false)}
              className="mb-6"
            >
              Back to Job Details
            </Button>
            <JobApplicationForm job={job} />
          </>
        ) : (
          <>
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <Badge className="mb-2">{job.category}</Badge>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-gray-500">Posted {timeAgo}</p>
              </div>
              
              {isAuthenticated && user?.role === 'freelancer' && job.status === 'open' && (
                <Button onClick={handleApply}>
                  Apply Now
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                    <div className="prose max-w-none text-gray-700">
                      {job.description.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-8 mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {!isAuthenticated ? (
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <h3 className="text-xl font-semibold mb-2">Interested in this job?</h3>
                      <p className="mb-4">Sign in or create an account to apply</p>
                      <Button variant="secondary" onClick={() => navigate('/auth')}>
                        Login / Register
                      </Button>
                    </CardContent>
                  </Card>
                ) : user?.role === 'freelancer' && job.status === 'open' && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <h3 className="text-xl font-semibold mb-2">Ready to apply?</h3>
                      <p className="mb-4">Submit a proposal that showcases why you're perfect for this job</p>
                      <Button onClick={handleApply}>
                        Submit a Proposal
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Budget</p>
                        <p className="font-semibold">${job.budget.min} - ${job.budget.max}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Deadline</p>
                        <p className="font-semibold">{new Date(job.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Status</p>
                        <Badge>{job.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">About the Client</h3>
                    <p className="text-gray-600">Client #2{job.clientId}</p>
                    <p className="text-gray-600 mt-2">Verified Payment Method</p>
                    <p className="text-gray-600">5 Jobs Posted</p>
                    <p className="text-gray-600">4.8/5 Rating</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default JobDetailPage;
