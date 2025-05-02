
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';
import { Send } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
}

interface MessageChatProps {
  contact: Contact;
  currentUserId: string;
}

// Mock message data
const mockMessages = [
  {
    id: '1',
    senderId: '101', // Contact ID
    receiverId: '1', // Current user ID
    content: 'Hi there! I saw your profile and I think you'd be perfect for our web development project.',
    createdAt: '2025-05-01T09:30:00',
    read: true,
  },
  {
    id: '2',
    senderId: '1', // Current user ID
    receiverId: '101', // Contact ID
    content: 'Thanks for reaching out! I'd be happy to discuss your project in more detail.',
    createdAt: '2025-05-01T09:35:00',
    read: true,
  },
  {
    id: '3',
    senderId: '101', // Contact ID
    receiverId: '1', // Current user ID
    content: 'Great! The project involves building a responsive website for our e-commerce business. We need someone with React and Node.js experience.',
    createdAt: '2025-05-01T09:40:00',
    read: true,
  },
  {
    id: '4',
    senderId: '1', // Current user ID
    receiverId: '101', // Contact ID
    content: 'That sounds perfect for my skill set. I have several years of experience with both technologies. What's your timeline for the project?',
    createdAt: '2025-05-01T09:45:00',
    read: true,
  },
];

export const MessageChat = ({ contact, currentUserId }: MessageChatProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: contact.id,
      content: newMessage,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="py-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={contact.avatar} />
            <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
          </Avatar>
          <CardTitle>{contact.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[80%] p-3 rounded-lg
                ${message.senderId === currentUserId 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-gray-100'
                }
              `}
            >
              <p>{message.content}</p>
              <p className={`
                text-xs mt-1
                ${message.senderId === currentUserId 
                  ? 'text-primary-foreground/70' 
                  : 'text-gray-500'
                }
              `}>
                {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={newMessage.trim() === ''}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
