
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthTabs = () => {
  return (
    <div className="w-full max-w-md mx-auto py-6">
      <Tabs defaultValue="login">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-6">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register" className="mt-6">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
