
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Message } from '@/types/user';

interface MessageListProps {
  activeContactId: string;
  onSelectContact: (contactId: string) => void;
  messages?: Message[]; // Make messages optional to fix the error
}

// Mock contacts
const mockContacts = [
  {
    id: '101',
    name: 'Alice Client',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Hi there! I saw your profile and I think you\'d be perfect for our web development project.',
    timestamp: '2025-05-01T09:30:00',
    unread: false,
  },
  {
    id: '102',
    name: 'Bob Recruiter',
    avatar: '',
    lastMessage: 'I\'d like to discuss a potential project with you.',
    timestamp: '2025-04-30T15:45:00',
    unread: true,
  },
];

export const MessageList = ({ activeContactId, onSelectContact }: MessageListProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="divide-y">
          {mockContacts.map((contact) => (
            <div
              key={contact.id}
              className={`
                flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors
                ${activeContactId === contact.id ? 'bg-gray-100' : ''}
              `}
              onClick={() => onSelectContact(contact.id)}
            >
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium truncate">{contact.name}</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {new Date(contact.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
              </div>
              
              {contact.unread && (
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
