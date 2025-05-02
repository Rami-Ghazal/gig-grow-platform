
export type UserRole = 'client' | 'freelancer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface FreelancerProfile extends User {
  role: 'freelancer';
  bio: string;
  skills: string[];
  hourlyRate: number;
  resumeUrl?: string;
  experience: WorkExperience[];
}

export interface ClientProfile extends User {
  role: 'client';
  company?: string;
  industry?: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
}

export interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  skills: string[];
  category: string;
  deadline: string;
  createdAt: string;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
}

export interface JobApplication {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  proposedAmount: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}
