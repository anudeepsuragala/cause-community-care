
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import GoogleAuthButton from './GoogleAuthButton';
import PhoneAuthForm from './PhoneAuthForm';

const LoginContainer = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-soft">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4">
            <span className="text-white font-medium text-lg">SC</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to Social Cause</h1>
          <p className="mt-2 text-muted-foreground">Sign in to access your account</p>
        </div>
        
        <Tabs defaultValue="google" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="google" className="space-y-4">
            <GoogleAuthButton />
          </TabsContent>
          
          <TabsContent value="phone" className="space-y-4">
            <PhoneAuthForm />
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
