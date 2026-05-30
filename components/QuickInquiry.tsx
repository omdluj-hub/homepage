"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const QuickInquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "상담받고 싶은 분야",
    message: "",
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("상담 신청이 완료되었습니다. 곧 연락드리겠습니다!");
        setFormData({
          name: "",
          phone: "",
          category: "상담받고 싶은 분야",
          message: "",
          privacy: false,
        });
      } else {
        const errData = await response.json();
        alert(`신청 중 오류가 발생했습니다: ${errData.error || "잠시 후 다시 시도해 주세요."}`);
      }
    } catch (e: any) {
      alert(`신청 중 오류가 발생했습니다: ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-[#e8e4df] focus:border-primary px-4 py-3.5 outline-none transition-colors duration-300 text-[15px] text-[#1C1917] placeholder:text-[#c0bbb5] font-light rounded-none";
  const labelClass =
    "block text-[9px] font-bold tracking-[0.3em] text-primary uppercase mb-2 font-en";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Name</label>
          <input
            type="text"
            required
            className={inputClass}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="성함을 입력해주세요"
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            required
            className={inputClass}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="연락처를 입력해주세요"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          className={`${inputClass} appearance-none cursor-pointer`}
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
        <label className={labelClass}>Message</label>
        <textarea
          rows={3}
          className={`${inputClass} resize-none`}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="문의 내용을 입력해주세요"
        />
      </div>

      <div className="flex items-start gap-3 pt-1">
        <div className="relative mt-0.5">
          <input
            id="privacy"
            type="checkbox"
            className="peer sr-only"
            checked={formData.privacy}
            onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
          />
          <label
            htmlFor="privacy"
            className="flex items-center justify-center w-4 h-4 border border-[#c0bbb5] peer-checked:border-primary peer-checked:bg-primary transition-all cursor-pointer"
          >
            {formData.privacy && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </label>
        </div>
        <label htmlFor="privacy" className="text-[12px] text-[#8a8480] font-light leading-relaxed cursor-pointer">
          개인정보 수집 및 이용 동의 <span className="text-primary font-semibold">(필수)</span>. 입력하신 정보는 상담 목적으로만 사용됩니다.
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group w-full bg-accent text-white font-bold py-5 tracking-[0.25em] uppercase hover:bg-primary transition-all duration-400 flex items-center justify-center gap-3 text-[11px] disabled:opacity-60 disabled:cursor-not-allowed font-en"
      >
        {isSubmitting ? "전송 중..." : "간편상담 신청하기"}
        {!isSubmitting && (
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </button>
    </form>
  );
};

export default QuickInquiry;
