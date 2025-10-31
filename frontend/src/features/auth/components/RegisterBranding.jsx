import React from "react";
import { BookOpen, CheckCircle } from "lucide-react";

export default function RegisterBranding() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <span className="text-4xl font-bold text-gray-900">WordPal</span>
      </div>

      <h1 className="text-5xl font-bold text-gray-900 leading-tight">
        Bắt đầu{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          miễn phí
        </span>
      </h1>

      <p className="text-xl text-gray-600">
        Tham gia cùng hàng triệu học sinh trên toàn thế giới đang học tập hiệu quả với WordPal
      </p>

      <div className="space-y-4 pt-6">
        {[
          { color: "purple", text: "Hoàn toàn miễn phí" },
          { color: "blue", text: "Học mọi lúc mọi nơi" },
          { color: "green", text: "Cộng đồng hỗ trợ" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-3">
            <div className={`w-10 h-10 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
              <CheckCircle className={`w-5 h-5 text-${item.color}-600`} />
            </div>
            <h3 className="font-semibold text-gray-900">{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
