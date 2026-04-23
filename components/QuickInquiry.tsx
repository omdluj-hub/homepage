"use client";

import { useState } from "react";

const QuickInquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "다이어트",
    message: "",
    privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert("상담 신청이 완료되었습니다. 곧 연락드리겠습니다!");
        setFormData({ name: "", phone: "", category: "다이어트", message: "", privacy: false });
      } else {
        alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (e) {
      alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <section className="bg-secondary py-16 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-2">빠른 상담 신청</h2>
          <p className="text-muted">궁금하신 점을 남겨주시면 정성껏 답변해 드리겠습니다.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">성함</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                id="phone"
                placeholder="010-0000-0000"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">관심 진료</label>
            <select
              id="category"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>여드름/흉터</option>
              <option>피부질환</option>
              <option>피부미용</option>
              <option>다이어트</option>
              <option>교통사고 입원</option>
              <option>기타</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">문의내용</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="privacy" className="font-medium text-gray-700">개인정보 수집 및 이용 동의 (필수)</label>
              <p className="text-gray-500 text-xs mt-1">입력하신 정보는 상담 목적으로만 사용되며, 그 외의 목적으로는 활용되지 않습니다.</p>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-opacity-90 transition-all shadow-md transform hover:-translate-y-0.5"
          >
            상담 신청하기
          </button>
        </form>
      </div>
    </section>
  );
};

export default QuickInquiry;
