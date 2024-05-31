"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateToken } from "@/utils/utils";
import { useAuthContext } from "@/contexts/auth-context";
import { useQuery } from "convex/react";
import { useUserContext } from "@/contexts/user-context";
import { useState } from "react";
import { verifyUserLogin } from "@/utils/authUtils";
// import { UserContext } from '@/contexts/user-context';
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(9, {
    message: "Password must be at least 9 characters.",
  }),
})



export const Login: React.FC = () => {
  const { setIsAuthenticated } = useAuthContext();
  const { mutate, pending } = useApiMutation(api.user.create);
  const verifyCredentials = useApiMutation(api.user.verifyCredentials).mutate;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSignUp = (values: z.infer<typeof formSchema>) => {
    const token = generateToken();
    mutate({
      username: values.username,
      password: values.password,
      accessToken: token
    })
    .then((id) => {
      toast.success("Account created");
      setIsAuthenticated(true)
      sessionStorage.setItem('authToken', token);
    })
    .catch((err) => toast.error("Failed to create account"))
  }


  const onLogIn = async () => {
    const values = form.getValues();
    verifyCredentials({
      username: values.username,
      password: values.password
    })
    .then(({username, accessToken}) => {
      toast.success("Logged in successfully");
      sessionStorage.setItem('authToken', accessToken)
      setIsAuthenticated(true)
    })
    .catch((err) => toast.error("Failed to log in"))

  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center translate-y-[100%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-8 w-[380px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mr-4" type="submit" variant="outline">Sign up</Button>
          <Button type="button" onClick={onLogIn}>Log in</Button>
        </form>
      </Form>
    </div>
  )
}