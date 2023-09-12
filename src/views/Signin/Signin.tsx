"use client";

import * as z from "zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";

import {
  GoogleAuthProvider,
  Persistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@lib/firebase-config";
import authService from "@services/auth.service";
import { setCookie } from "cookies-next";
import { ACCESS_TOKEN_KEY } from "@constants/common.constant";
import { toast } from "@components/ui/use-toast";
import { AxiosError } from "axios";
import { TErrorResponse } from "types/error-response.type";
import { useEffect } from "react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const SigninView = () => {
  const router = useRouter();

  const currentUser = auth.currentUser;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleSigninWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      if (response.user) {
        const token = await response.user.getIdToken();
        setCookie(ACCESS_TOKEN_KEY, token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        const signinResponse = await authService.signIn();
        if (signinResponse.status === 200) {
          router.push("/");
        }
      }
    } catch (error) {
      const err = error as AxiosError<TErrorResponse>;
      toast({
        title: "Please try again!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{err.response?.data.message}</code>
          </pre>
        ),
      });
    }
  };
  const handleSigninWithEmailAndPassword = async (
    data: z.infer<typeof FormSchema>
  ) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (result.user) {
        const token = await result.user.getIdToken();
        setCookie(ACCESS_TOKEN_KEY, token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        const signinResponse = await authService.signIn();
        if (signinResponse.status === 200) {
          router.push("/");
        }
      }
    } catch (error) {
      const err = error as AxiosError<TErrorResponse>;
      toast({
        title: "Please try again!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{err.response?.data.message}</code>
          </pre>
        ),
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white py-4 px-8 rounded-md grid grid-cols-1 gap-4 max-w-sm w-full">
        <p className="text-center text-2xl text-gray-800">Sign In</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSigninWithEmailAndPassword)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <p className="text-center">Or</p>
        <Button variant="secondary" onClick={handleSigninWithGoogle}>
          <Mail className="mr-2 h-4 w-4" /> Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default SigninView;
