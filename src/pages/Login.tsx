
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  LogIn, 
  Phone,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfirmationResult } from 'firebase/auth';

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

const codeSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

const Login = () => {
  const { signInWithGoogle, signInWithPhone, confirmPhoneCode, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

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

  const onPhoneSubmit = async (data: z.infer<typeof phoneSchema>) => {
    try {
      // Format phone number to E.164 format
      let phoneNumber = data.phoneNumber;
      if (!phoneNumber.startsWith('+')) {
        phoneNumber = `+1${phoneNumber}`; // Default to US code if not specified
      }
      
      const result = await signInWithPhone(phoneNumber);
      setConfirmationResult(result);
      setIsVerifying(true);
      toast.success("Verification code sent!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send verification code. Please try again.");
    }
  };

  const onCodeSubmit = async (data: z.infer<typeof codeSchema>) => {
    if (!confirmationResult) {
      toast.error("Please request a verification code first");
      return;
    }

    try {
      await confirmPhoneCode(confirmationResult, data.code);
      toast.success("Successfully signed in!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Invalid verification code. Please try again.");
    }
  };

  const resetPhoneVerification = () => {
    setIsVerifying(false);
    setConfirmationResult(null);
    phoneForm.reset();
    codeForm.reset();
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
        
        <Tabs defaultValue="google" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="google" className="space-y-4">
            <Button 
              onClick={handleGoogleSignIn} 
              className="w-full py-6 flex items-center justify-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Sign in with Google</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="phone" className="space-y-4">
            {!isVerifying ? (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+1 (555) 123-4567" 
                            {...field} 
                            type="tel"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div id="recaptcha-container" className="flex justify-center my-4"></div>
                  <Button type="submit" className="w-full py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Send Verification Code
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...codeForm}>
                <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-4">
                  <FormField
                    control={codeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <Button type="submit" className="w-full py-6">
                      <LogIn className="mr-2 h-5 w-5" />
                      Verify and Sign In
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetPhoneVerification}
                      className="w-full"
                    >
                      Try with different number
                    </Button>
                  </div>
                </form>
              </Form>
            )}
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

export default Login;
