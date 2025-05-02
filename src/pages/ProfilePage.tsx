
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { FreelancerProfileForm } from '@/components/profile/FreelancerProfileForm';
import { FreelancerProfile } from '@/components/profile/FreelancerProfile';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{user?.role === 'freelancer' ? 'My Profile' : 'Company Profile'}</h1>
        
        {user?.role === 'freelancer' ? (
          <Tabs defaultValue="view">
            <TabsList className="mb-8">
              <TabsTrigger value="view">View Profile</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="view">
              <FreelancerProfile profile={{
                id: user?.id || '1',
                name: user?.name || 'Freelancer Name',
                email: user?.email || 'email@example.com',
                role: 'freelancer',
                bio: 'Experienced web developer with 5+ years working on complex applications. Specialized in React, Node.js, and modern JavaScript. Fast delivery with high-quality code standards.',
                skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML/CSS', 'MongoDB', 'Express'],
                hourlyRate: 45,
                avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                resumeUrl: '#',
                experience: [
                  {
                    id: '1',
                    title: 'Senior Frontend Developer',
                    company: 'Tech Solutions Inc',
                    startDate: '2020-01',
                    endDate: 'Present',
                    description: 'Led development of the company\'s main web application using React and TypeScript. Improved performance by 40% and implemented CI/CD pipelines.'
                  },
                  {
                    id: '2',
                    title: 'Web Developer',
                    company: 'Digital Agency',
                    startDate: '2018-05',
                    endDate: '2019-12',
                    description: 'Created websites for various clients using modern JavaScript frameworks and responsive design techniques.'
                  }
                ]
              }} />
            </TabsContent>
            <TabsContent value="edit">
              <FreelancerProfileForm />
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Client Profile</h2>
              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>
              <p>Role: Client</p>
              <p>Company settings and profile editor coming soon.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
