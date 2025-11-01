import React from "react";
import RegisterForm from "../features/auth/components/RegisterForm";
import RegisterBranding from "../features/auth/components/RegisterBranding";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Registration Form */}
        <RegisterForm />

        {/* Right Side - Branding */}
        <div className="hidden md:block order-1 md:order-2">
          <RegisterBranding />
        </div>
      </div>
    </div>
  );
}
