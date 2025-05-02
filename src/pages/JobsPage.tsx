
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { Job } from '@/types/user';

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    clientId: '201',
    title: 'WordPress Developer Needed for E-commerce Site',
    description: 'We need an experienced WordPress developer to build a custom e-commerce website with WooCommerce. The site should have a modern design, be fully responsive, and include custom product filtering options.',
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
    description: 'We are a new tech startup looking for a professional logo design that represents our innovative approach to AI solutions. We need both logo files and brand guidelines.',
    budget: { min: 300, max: 500 },
    skills: ['Logo Design', 'Brand Identity', 'Adobe Illustrator', 'Branding', 'Typography'],
    category: 'Design',
    deadline: '2025-05-20',
    createdAt: '2025-04-28',
    status: 'open',
  },
  {
    id: '3',
    clientId: '203',
    title: 'Mobile App UI Designer for Fitness App',
    description: 'Looking for a talented UI designer to create intuitive and engaging interfaces for our fitness tracking app. Experience with fitness or health apps is a plus.',
    budget: { min: 800, max: 1500 },
    skills: ['UI Design', 'Mobile App Design', 'Figma', 'iOS', 'Android', 'User Experience'],
    category: 'Design',
    deadline: '2025-06-15',
    createdAt: '2025-04-25',
    status: 'open',
  },
  {
    id: '4',
    clientId: '204',
    title: 'Content Writer for SaaS Blog',
    description: 'We need an experienced content writer who specializes in SaaS and tech topics to create weekly blog posts for our company blog. Must have excellent research skills and SEO knowledge.',
    budget: { min: 200, max: 400 },
    skills: ['Content Writing', 'SEO', 'Blog Writing', 'SaaS', 'Technology'],
    category: 'Writing',
    deadline: '2025-05-30',
    createdAt: '2025-05-02',
    status: 'open',
  },
];

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState({});
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);

  useEffect(() => {
    // Load jobs from localStorage
    const storedJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
    if (storedJobs.length > 0) {
      // Combine stored jobs with mock jobs for demo purposes
      // In a real app, you'd only use stored or fetched jobs
      setJobs([...storedJobs, ...mockJobs]);
      setFilteredJobs([...storedJobs, ...mockJobs]);
    }
  }, []);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    
    // Apply filters
    let results = jobs;
    
    // Filter by search term
    if (newFilters.search) {
      const searchTerm = newFilters.search.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by categories
    if (newFilters.categories && newFilters.categories.length > 0) {
      results = results.filter(job => 
        newFilters.categories.includes(job.category)
      );
    }
    
    // Filter by budget range
    if (newFilters.budgetRange) {
      const [min, max] = newFilters.budgetRange;
      results = results.filter(job => 
        job.budget.min <= max && job.budget.max >= min
      );
    }
    
    setFilteredJobs(results);
  };

  return (
    <MainLayout requireAuth={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <JobFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Job listings */}
          <div className="flex-1">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters to find more opportunities
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobsPage;
