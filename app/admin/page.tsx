"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Bot, 
  MousePointer2, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  Lock
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check if already authenticated
    if (typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
      fetchStats();
    } else {
      setLoading(false);
    }

    const interval = setInterval(() => {
      if (typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true") {
        fetchStats();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "gnrnal1075") {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setLoading(true);
      fetchStats();
    } else {
      setErrorMsg("비밀번호가 올바르지 않습니다.");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-primary w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="text-gray-500 mt-2">보안을 위해 비밀번호를 입력해주세요.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-center"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg("");
                }}
              />
              {errorMsg && <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-lg"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <TrendingUp className="text-primary" />
              통합 관리자 대시보드
            </h1>
            <p className="text-gray-500">후한의원 구미점 홈페이지 실시간 접속 및 문의 통계</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
          >
            로그아웃
          </button>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="총 방문자 (최근 1000건)" 
            value={stats?.totalVisits || 0} 
            icon={<Users className="text-blue-500" />} 
            color="bg-blue-50"
          />
          <StatCard 
            title="사람 방문" 
            value={stats?.humanVisits || 0} 
            icon={<MousePointer2 className="text-green-500" />} 
            color="bg-green-50"
          />
          <StatCard 
            title="AI/검색봇 방문" 
            value={stats?.botVisits || 0} 
            icon={<Bot className="text-purple-500" />} 
            color="bg-purple-50"
          />
          <StatCard 
            title="최근 상담 신청" 
            value={stats?.recentInquiries?.length || 0} 
            icon={<MessageSquare className="text-orange-500" />} 
            color="bg-orange-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  최근 상담 신청 내역
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="px-6 py-4 font-semibold">날짜</th>
                      <th className="px-6 py-4 font-semibold">이름</th>
                      <th className="px-6 py-4 font-semibold">연락처</th>
                      <th className="px-6 py-4 font-semibold">진료분야</th>
                      <th className="px-6 py-4 font-semibold text-right">상세보기</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {stats?.recentInquiries?.map((inq: any) => (
                      <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {new Date(inq.timestamp).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{inq.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{inq.phone}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-secondary text-point-green rounded-md text-xs font-bold">
                            {inq.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedInquiry(inq)}
                            className="text-xs font-bold text-primary hover:underline bg-primary/5 px-3 py-1 rounded-full transition-all"
                          >
                            내용보기
                          </button>
                        </td>
                      </tr>
                    ))}
                    {(!stats?.recentInquiries || stats.recentInquiries.length === 0) && (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-gray-400">최근 문의 내역이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-primary" />
                주요 유입 경로 (Top Referers)
              </h2>
              <div className="space-y-4">
                {stats?.topReferers?.map(([domain, count]: any) => (
                  <div key={domain} className="flex items-center gap-4">
                    <div className="flex-grow">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{domain === 'null' ? '직접 유입 / 북마크' : domain}</span>
                        <span className="text-gray-400">{count} visits</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(100, (count / stats.totalVisits) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                인기 페이지 (Page Views)
              </h2>
              <div className="space-y-6">
                {Object.entries(stats?.pageViews || {})
                  .sort((a: any, b: any) => b[1] - a[1])
                  .slice(0, 15)
                  .map(([path, count]: any) => (
                    <div key={path} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-secondary rounded-lg text-point-green font-bold text-xs">
                          {count}
                        </div>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors truncate max-w-[180px]">{path}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
te/20 p-2 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 mb-1">신청자 성함</p>
                  <p className="font-bold text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-400 mb-1">진료 분야</p>
                  <p className="font-bold text-point-green">{selectedInquiry.category}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-xs text-gray-400 mb-1">연락처</p>
                <p className="font-bold text-gray-900 text-lg">{selectedInquiry.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2 px-1">문의 내용</p>
                <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[150px] max-h-[300px] overflow-y-auto">
                  {selectedInquiry.message || "입력된 내용이 없습니다."}
                </div>
              </div>
              <div className="text-right text-[10px] text-gray-400 italic">
                신청 일시: {new Date(selectedInquiry.timestamp).toLocaleString('ko-KR')}
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-opacity-90 transition-all"
              >
                확인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
