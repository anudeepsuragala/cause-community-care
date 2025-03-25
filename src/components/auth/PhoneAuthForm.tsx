
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '../../contexts/AuthContext';
import OTPVerification from './OTPVerification';

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

const PhoneAuthForm = () => {
  const { signInWithPhone, confirmPhoneCode } = useAuth();
  const navigate = useNavigate();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

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

  const handleVerifyCode = async (code: string) => {
    if (!confirmationResult) {
      toast.error("Please request a verification code first");
      return;
    }

    try {
      await confirmPhoneCode(confirmationResult, code);
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
  };

  return (
    <>
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
        <OTPVerification 
          confirmationResult={confirmationResult}
          onVerifyCode={handleVerifyCode}
          onReset={resetPhoneVerification}
        />
      )}
    </>
  );
};

export default PhoneAuthForm;
