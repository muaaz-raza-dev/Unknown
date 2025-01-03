import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import GoogleAuthButton from "@/components/auth/Google-auth-button";
import LocalLoginForm from "@/components/auth/local-login-form";
import Link from "next/link";
export const metadata={
  title:"Signin"
}
export default function page() {
  return (
    <div className="min-h-[80vh] w-screen flex flex-col gap-8 items-center justify-center  overflow-hidden">
      {/* Background */}

      <Card className="w-full max-w-md p-3 shadow-md ">
        
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center pb-0">
            Just wating for you
          </CardTitle>
        </CardHeader>
          <CardContent className="space-y-3">
           <GoogleAuthButton /> 
          <LocalLoginForm/>
        </CardContent>
      </Card>
      <div className=" text-center text-muted text-sm font-medium">
        Dont have an account?{" "}
        <Link href="/auth/signup" className="font-semibold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
