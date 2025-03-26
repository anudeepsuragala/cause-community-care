
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GoogleAuthButton from './GoogleAuthButton';
import EmailSignInForm from './EmailSignInForm';
import EmailSignUpForm from './EmailSignUpForm';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const LoginContainer = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-soft">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4">
            <span className="text-white font-medium text-lg">SC</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to Social Cause</h1>
          <p className="mt-2 text-muted-foreground">
            {authMode === 'signin' ? 'Sign in to access your account' : 'Create a new account'}
          </p>
        </div>
        
        <Tabs defaultValue="email" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-4">
            {authMode === 'signin' ? <EmailSignInForm /> : <EmailSignUpForm />}
            
            <div className="text-center mt-4">
              <Button 
                variant="link" 
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              >
                {authMode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="google" className="space-y-4">
            <GoogleAuthButton />
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
