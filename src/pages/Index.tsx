
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Search, Briefcase, User } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Connect with the perfect <span className="text-primary">freelancers</span> for your projects
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                GigGrow helps businesses find skilled freelancers and allows professionals to discover opportunities that match their expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated ? (
                  <>
                    <Button size="lg" asChild>
                      <Link to="/auth">Join Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/how-it-works">How It Works</Link>
                    </Button>
                  </>
                ) : (
                  <Button size="lg" asChild>
                    <Link to={user?.role === 'client' ? '/post-job' : '/jobs'}>
                      {user?.role === 'client' ? 'Post a Job' : 'Find Work'}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                alt="Freelancers collaborating" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How GigGrow Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover-card-effect">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {user?.role === 'client' ? 'Post a Job' : 'Find Opportunities'}
              </h3>
              <p className="text-gray-600">
                {user?.role === 'client' 
                  ? 'Create a detailed job posting with your requirements, budget, and deadline.' 
                  : 'Browse available projects that match your skills and experience.'}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover-card-effect">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {user?.role === 'client' ? 'Review Applications' : 'Submit Proposals'}
              </h3>
              <p className="text-gray-600">
                {user?.role === 'client' 
                  ? 'Review applicants, check their portfolios, and find the perfect match for your project.' 
                  : 'Send customized proposals showcasing your skills and explaining how you can help.'}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover-card-effect">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {user?.role === 'client' ? 'Hire & Collaborate' : 'Get Hired & Deliver'}
              </h3>
              <p className="text-gray-600">
                {user?.role === 'client' 
                  ? 'Choose the best freelancer, discuss details, and start working together.' 
                  : 'Secure projects, deliver quality work, and build your professional reputation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Web Development",
              "Mobile Development",
              "UI/UX Design",
              "Logo Design",
              "Content Writing",
              "Digital Marketing",
              "Video Editing",
              "Data Entry"
            ].map((category) => (
              <Link
                key={category}
                to={`/jobs?category=${encodeURIComponent(category)}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center font-medium hover:text-primary"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to {isAuthenticated && user?.role === 'client' ? 'find talent' : 'grow your career'}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isAuthenticated && user?.role === 'client'
              ? 'Post a job today and connect with skilled professionals ready to bring your vision to life.'
              : 'Create your profile today and start finding opportunities that match your skills and experience.'}
          </p>
          <Button size="lg" variant="secondary" asChild className="font-semibold">
            <Link to={isAuthenticated ? '/dashboard' : '/auth'}>
              {isAuthenticated 
                ? 'Go to Dashboard' 
                : 'Get Started Now'}
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
