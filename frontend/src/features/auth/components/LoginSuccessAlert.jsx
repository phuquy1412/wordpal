import React from "react";
import { CheckCircle } from "lucide-react";

export default function LoginSuccessAlert() {
  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-green-800 font-medium">Đăng nhập thành công!</p>
        <p className="text-green-600 text-sm">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
