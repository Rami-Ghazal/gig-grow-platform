
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface MessagePreview {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface MessageListProps {
  messages: MessagePreview[];
  activeContactId?: string;
  onSelectContact: (contactId: string) => void;
}

// Mock message data
const mockMessages: MessagePreview[] = [
  {
    id: '1',
    contactId: '101',
    contactName: 'Alice Client',
    contactAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'I reviewed your proposal for the website project. Can we discuss the timeline?',
    timestamp: '2025-05-01T15:30:00',
    unread: true,
  },
  {
    id: '2',
    contactId: '102',
    contactName: 'Bob Recruiter',
    contactAvatar: '',
    lastMessage: 'Thank you for your application. Your skills match what we\'re looking for.',
    timestamp: '2025-04-30T10:15:00',
    unread: false,
  },
];

export const MessageList = ({ 
  messages = mockMessages, 
  activeContactId,
  onSelectContact 
}: MessageListProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="h-full">
      <CardHeader className="py-4">
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`
                flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors
                ${activeContactId === message.contactId ? 'bg-gray-100' : ''}
              `}
              onClick={() => onSelectContact(message.contactId)}
            >
              <Avatar>
                <AvatarImage src={message.contactAvatar} />
                <AvatarFallback>{getInitials(message.contactName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">{message.contactName}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
              </div>
              {message.unread && (
                <Badge className="h-2 w-2 rounded-full p-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
