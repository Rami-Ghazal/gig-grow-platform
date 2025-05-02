
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FreelancerProfile as ProfileType } from '@/types/user';
import { FileText, Mail, ArrowDown } from 'lucide-react';

interface FreelancerProfileProps {
  profile: ProfileType;
  isPublic?: boolean;
}

// Mock freelancer profile
const mockProfile: ProfileType = {
  id: '1',
  name: 'John Freelancer',
  email: 'john@example.com',
  role: 'freelancer',
  bio: 'Experienced web developer with 5+ years working on complex applications. Specialized in React, Node.js, and modern JavaScript. Fast delivery with high-quality code standards.',
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML/CSS', 'MongoDB', 'Express'],
  hourlyRate: 45,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
};

export const FreelancerProfile = ({ profile = mockProfile, isPublic = false }: FreelancerProfileProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.experience[0]?.title}</p>
                </div>
                
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="font-bold text-lg text-primary">${profile.hourlyRate}/hr</p>
                  {isPublic && (
                    <Button size="sm" className="mt-2">
                      <Mail className="mr-1 h-4 w-4" />
                      Contact Me
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600">{profile.bio}</p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-800 hover:bg-blue-100">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              {profile.resumeUrl && (
                <div className="mt-4">
                  <Button variant="outline" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Download Resume</span>
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                    {exp.endDate === 'Present' ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                  </p>
                </div>
                <p className="text-md">{exp.company}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
