
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Mail, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const { signInWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-soft">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4">
            <span className="text-white font-medium text-lg">SC</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to Social Cause</h1>
          <p className="mt-2 text-muted-foreground">Sign in to access your account</p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Button 
            onClick={handleGoogleSignIn} 
            className="w-full py-6 flex items-center justify-center space-x-2"
          >
            <Mail className="h-5 w-5" />
            <span>Sign in with Google</span>
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
