// src/page/ResetPasswordPage.jsx
import React from "react";
import ResetPasswordForm from "../features/auth/components/ResetPasswordForm";
import ForgotPasswordBranding from "../features/auth/components/ForgotPasswordBranding";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <ForgotPasswordBranding />

        {/* Right Side - Form */}
        <ResetPasswordForm />
      </div>
    </div>
  );
}