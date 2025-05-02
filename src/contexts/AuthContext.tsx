
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data for development
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Freelancer',
    email: 'john@example.com',
    role: 'freelancer' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Alice Client',
    email: 'alice@example.com',
    role: 'client' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem('gigGrowUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('gigGrowUser', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate API delay
    });
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if email exists
        if (MOCK_USERS.some(u => u.email === email)) {
          setIsLoading(false);
          reject(new Error('Email already exists'));
          return;
        }
        
        const newUser: User = {
          id: `${MOCK_USERS.length + 1}`,
          name,
          email,
          role,
        };
        
        setUser(newUser);
        localStorage.setItem('gigGrowUser', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000); // Simulate API delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gigGrowUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
