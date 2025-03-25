
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GoogleAuthButton = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Successfully signed in!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <Button 
      onClick={handleGoogleSignIn} 
      className="w-full py-6 flex items-center justify-center space-x-2"
    >
      <Mail className="h-5 w-5" />
      <span>Sign in with Google</span>
    </Button>
  );
};

export default GoogleAuthButton;
