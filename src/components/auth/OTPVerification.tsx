
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
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

const codeSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

interface OTPVerificationProps {
  confirmationResult: ConfirmationResult | null;
  onVerifyCode: (code: string) => Promise<void>;
  onReset: () => void;
}

const OTPVerification = ({ confirmationResult, onVerifyCode, onReset }: OTPVerificationProps) => {
  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onCodeSubmit = async (data: z.infer<typeof codeSchema>) => {
    if (!confirmationResult) {
      return;
    }
    await onVerifyCode(data.code);
  };

  return (
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
            onClick={onReset}
            className="w-full"
          >
            Try with different number
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OTPVerification;
