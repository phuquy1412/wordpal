import React from 'react';
import { LoginForm } from '../features/auth/components/LoginForm';
// (Bạn cũng nên tách phần bên trái ra 1 component)
// import { AuthBranding } from '../features/auth/components/AuthBranding';

// (Tách phần bên trái ra đây cho gọn)
const AuthBranding = () => (
    <div className="hidden md:block">
        {/* ... Toàn bộ JSX của phần "Branding" bên trái ... */}
    </div>
);


export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
                
                {/* Lắp ráp phần bên trái */}
                <AuthBranding />

                {/* Lắp ráp phần bên phải */}
                <LoginForm />

            </div>
        </div>
    );
}