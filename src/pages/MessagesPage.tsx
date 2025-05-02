
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MessageList } from '@/components/messaging/MessageList';
import { MessageChat } from '@/components/messaging/MessageChat';
import { useAuth } from '@/contexts/AuthContext';

// Mock contacts
const mockContacts = [
  {
    id: '101',
    name: 'Alice Client',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '102',
    name: 'Bob Recruiter',
    avatar: '',
  },
];

const MessagesPage = () => {
  const { user } = useAuth();
  const [activeContactId, setActiveContactId] = useState<string>(mockContacts[0].id);
  
  const activeContact = mockContacts.find(c => c.id === activeContactId);
  
  return (
    <MainLayout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
          <div className="md:col-span-1 h-full">
            <MessageList 
              activeContactId={activeContactId}
              onSelectContact={setActiveContactId}
            />
          </div>
          
          <div className="md:col-span-2 h-full">
            {activeContact && user && (
              <MessageChat 
                contact={activeContact}
                currentUserId={user.id}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
