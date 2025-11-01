import React from "react";
import LoginForm from "../features/auth/components/LoginForm";
import AuthBranding from "../features/auth/components/AuthBranding";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <AuthBranding />

        {/* Right Side */}
        <LoginForm />
      </div>
      
    </div>
   
  );
}
