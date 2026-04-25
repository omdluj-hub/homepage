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
        const errData = await response.json();
        alert(`신청 중 오류가 발생했습니다: ${errData.error || "잠시 후 다시 시도해 주세요."}`);
      }
    } catch (e: any) {
      alert(`신청 중 오류가 발생했습니다: ${e.message}`);
    }
  };

  return (
    <section className="bg-black text-white py-32 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 mb-6">Concierge</h2>
          <h3 className="text-4xl font-black tracking-tighter">QUICK INQUIRY</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 gap-12">
            <div className="relative group">
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-gray-800 py-4 outline-none focus:border-white transition-colors text-lg font-light"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="성함"
              />
            </div>
            <div className="relative group">
              <input
                type="tel"
                required
                className="w-full bg-transparent border-b border-gray-800 py-4 outline-none focus:border-white transition-colors text-lg font-light"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="연락처"
              />
            </div>
          </div>
          
          <div>
            <select
              className="w-full bg-transparent border-b border-gray-800 py-4 outline-none focus:border-white transition-colors text-lg font-light appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option className="bg-black">여드름/흉터</option>
              <option className="bg-black">피부질환</option>
              <option className="bg-black">피부미용</option>
              <option className="bg-black">다이어트</option>
              <option className="bg-black">교통사고 입원</option>
              <option className="bg-black">기타</option>
            </select>
          </div>
          
          <div>
            <textarea
              rows={3}
              className="w-full bg-transparent border-b border-gray-800 py-4 outline-none focus:border-white transition-colors text-lg font-light resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="문의내용"
            ></textarea>
          </div>
          
          <div className="flex items-start gap-4">
            <input
              id="privacy"
              type="checkbox"
              className="mt-1 h-4 w-4 bg-transparent border-gray-800 rounded focus:ring-0"
              checked={formData.privacy}
              onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
            />
            <label htmlFor="privacy" className="text-xs text-gray-500 font-light leading-relaxed">
              개인정보 수집 및 이용 동의 (필수). 입력하신 정보는 상담 목적으로만 사용되며, 그 외의 목적으로는 활용되지 않습니다.
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-6 tracking-[0.2em] uppercase hover:bg-gray-200 transition-luxury"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </section>
  );
};

export default QuickInquiry;
