"use client";

import { useState } from "react";

const QuickInquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "상담받고 싶은 분야",
    message: "",
    privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.category === "상담받고 싶은 분야") {
      alert("상담받고 싶은 분야를 선택해 주세요.");
      return;
    }
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
        setFormData({ name: "", phone: "", category: "상담받고 싶은 분야", message: "", privacy: false });
      } else {
        const errData = await response.json();
        alert(`신청 중 오류가 발생했습니다: ${errData.error || "잠시 후 다시 시도해 주세요."}`);
      }
    } catch (e: any) {
      alert(`신청 중 오류가 발생했습니다: ${e.message}`);
    }
  };

  return (
    <section className="bg-transparent text-black py-4">
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 gap-10">
            <div className="relative group">
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">Name</p>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-primary transition-colors text-lg font-normal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="성함을 입력해주세요"
              />
            </div>
            <div className="relative group">
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">Phone</p>
              <input
                type="tel"
                required
                className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-primary transition-colors text-lg font-normal"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="연락처를 입력해주세요"
              />
            </div>
          </div>
          
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">Category</p>
            <select
              className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-primary transition-colors text-lg font-normal appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option disabled>상담받고 싶은 분야</option>
              <option>여드름/흉터</option>
              <option>피부질환</option>
              <option>피부미용</option>
              <option>다이어트</option>
              <option>교통사고 입원</option>
              <option>기타</option>
            </select>
          </div>
          
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">Message</p>
            <textarea
              rows={3}
              className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-primary transition-colors text-lg font-normal resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="문의 내용을 입력해주세요"
            ></textarea>
          </div>
          
          <div className="flex items-start gap-4">
            <input
              id="privacy"
              type="checkbox"
              className="mt-1 h-4 w-4 border-gray-300 rounded focus:ring-primary text-primary"
              checked={formData.privacy}
              onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
            />
            <label htmlFor="privacy" className="text-xs text-gray-500 font-normal leading-relaxed">
              개인정보 수집 및 이용 동의 (필수). 입력하신 정보는 상담 목적으로만 사용됩니다.
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-6 tracking-[0.2em] uppercase hover:bg-primary-hover transition-luxury shadow-lg shadow-primary/20 rounded-sm"
          >
            간편상담 신청하기
          </button>
        </form>
      </div>
    </section>
  );
};

export default QuickInquiry;
