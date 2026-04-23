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
  Lock,
  Mail,
  RotateCw,
  LayoutDashboard,
  BarChart3,
  ClipboardList,
  Calendar,
  LogOut,
  Search
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, stats, inquiries

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
      fetchStats();
    } else {
      setLoading(false);
    }
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
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/stats?t=${Date.now()}`);
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error("Failed to fetch stats");
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const handleViewInquiry = async (inq: any) => {
    setSelectedInquiry(inq);
    if (!inq.is_read) {
      setStats((prev: any) => ({
        ...prev,
        unreadInquiries: Math.max(0, (prev.unreadInquiries || 1) - 1),
        recentInquiries: prev.recentInquiries.map((item: any) => 
          item.id === inq.id ? { ...item, is_read: true } : item
        )
      }));
      try {
        await fetch("/api/inquiry", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: inq.id, is_read: true })
        });
      } catch (e) {
        console.error("Failed to update read status");
        fetchStats();
      }
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
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-center"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMsg(""); }}
            />
            {errorMsg && <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>}
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-lg">
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
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">후</div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">관리자 센터</p>
              <p className="text-[10px] text-gray-400">후한의원 구미점</p>
            </div>
          </div>
        </div>
        <nav className="p-4 flex-grow space-y-2">
          <SidebarLink 
            icon={<LayoutDashboard size={20} />} 
            label="대시보드" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <SidebarLink 
            icon={<BarChart3 size={20} />} 
            label="방문자 통계" 
            active={activeTab === "stats"} 
            onClick={() => setActiveTab("stats")} 
          />
          <SidebarLink 
            icon={<ClipboardList size={20} />} 
            label="상담 신청 관리" 
            active={activeTab === "inquiries"} 
            onClick={() => setActiveTab("inquiries")} 
          />
        </nav>
        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all text-sm font-medium"
          >
            <LogOut size={18} /> 로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-x-hidden">
        {/* Top Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab === "dashboard" && "통합 대시보드"}
              {activeTab === "stats" && "상세 방문자 통계"}
              {activeTab === "inquiries" && "상담 신청 관리"}
            </h2>
            <p className="text-gray-500 text-sm">실시간 데이터 현황입니다.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={fetchStats}
              disabled={isRefreshing}
              className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-all group"
            >
              <RotateCw className={`w-5 h-5 text-gray-400 group-hover:text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {activeTab === "dashboard" && <DashboardView stats={stats} onTabChange={setActiveTab} />}
        {activeTab === "stats" && <StatsDetailView stats={stats} />}
        {activeTab === "inquiries" && <InquiryListView stats={stats} onView={handleViewInquiry} />}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedInquiry && (
        <InquiryModal inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />
      )}
    </div>
  );
}

// --- Sub Views ---

function DashboardView({ stats, onTabChange }: any) {
  return (
    <div className="space-y-8">
      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="오늘의 방문자" value={stats?.stats7d?.total / 7 || 0} unit="명" icon={<Users className="text-blue-500" />} color="bg-blue-50" />
        <StatCard title="최근 7일 방문" value={stats?.stats7d?.total || 0} unit="명" icon={<Calendar className="text-green-500" />} color="bg-green-50" />
        <StatCard title="안 읽은 상담" value={stats?.unreadInquiries || 0} unit="건" icon={<Mail className="text-red-500" />} color="bg-red-50" />
        <StatCard title="전체 상담" value={stats?.recentInquiries?.length || 0} unit="건" icon={<MessageSquare className="text-orange-500" />} color="bg-orange-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries Snippet */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><ClipboardList size={20} className="text-primary" /> 최근 문의</h3>
            <button onClick={() => onTabChange("inquiries")} className="text-xs text-gray-400 hover:text-primary">전체보기 +</button>
          </div>
          <div className="space-y-4">
            {stats?.recentInquiries?.slice(0, 5).map((inq: any) => (
              <div key={inq.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-secondary transition-colors cursor-pointer" onClick={() => onTabChange("inquiries")}>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{inq.name}</p>
                  <p className="text-xs text-gray-500">{inq.category}</p>
                </div>
                {!inq.is_read && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
              </div>
            ))}
          </div>
        </section>

        {/* Popular Pages Snippet */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><TrendingUp size={20} className="text-primary" /> 인기 페이지</h3>
            <button onClick={() => onTabChange("stats")} className="text-xs text-gray-400 hover:text-primary">자세히보기 +</button>
          </div>
          <div className="space-y-3">
            {Object.entries(stats?.pageViews || {}).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([path, count]: any) => (
              <div key={path} className="flex justify-between items-center p-2">
                <span className="text-sm text-gray-600 truncate max-w-[200px]">{path}</span>
                <span className="text-sm font-bold text-primary">{count} views</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatsDetailView({ stats }: any) {
  return (
    <div className="space-y-8">
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatsPeriodCard title="전체 기록" total={stats?.totalVisits} human={stats?.humanVisits} bot={stats?.botVisits} />
        <StatsPeriodCard title="최근 30일" total={stats?.stats30d?.total} human={stats?.stats30d?.human} bot={stats?.stats30d?.bot} />
        <StatsPeriodCard title="최근 7일" total={stats?.stats7d?.total} human={stats?.stats7d?.human} bot={stats?.stats7d?.bot} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Referers */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><ExternalLink size={20} className="text-primary" /> 유입 경로 순위</h3>
          <div className="space-y-4">
            {stats?.topReferers?.map(([domain, count]: any) => (
              <div key={domain} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-700">{domain === 'null' ? '직접유입' : domain}</span>
                  <span className="text-gray-400">{count}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${(count / stats.totalVisits) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Page Views */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Clock size={20} className="text-primary" /> 페이지별 상세 조회</h3>
          <div className="space-y-4">
            {Object.entries(stats?.pageViews || {}).sort((a: any, b: any) => b[1] - a[1]).map(([path, count]: any) => (
              <div key={path} className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-sm text-gray-600">{path}</span>
                <span className="text-sm font-bold text-gray-900">{count.toLocaleString()} <span className="text-[10px] text-gray-400 font-normal ml-1">뷰</span></span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function InquiryListView({ stats, onView }: any) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 flex items-center gap-2"><ClipboardList size={18} /> 상담 신청 리스트</h3>
        <span className="text-xs text-gray-400">총 {stats?.recentInquiries?.length || 0}건</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[12px] uppercase tracking-wider text-gray-400 border-b border-gray-50">
              <th className="px-6 py-4 font-semibold">상태</th>
              <th className="px-6 py-4 font-semibold">이름</th>
              <th className="px-6 py-4 font-semibold">진료분야</th>
              <th className="px-6 py-4 font-semibold">연락처</th>
              <th className="px-6 py-4 font-semibold">신청일</th>
              <th className="px-6 py-4 font-semibold text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {stats?.recentInquiries?.map((inq: any) => (
              <tr key={inq.id} className={`hover:bg-gray-50 transition-colors ${!inq.is_read ? 'bg-primary/5' : ''}`}>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${!inq.is_read ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                    {!inq.is_read ? "NEW" : "읽음"}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">{inq.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{inq.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{inq.phone}</td>
                <td className="px-6 py-4 text-xs text-gray-400">{new Date(inq.timestamp).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => onView(inq)} className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">상세보기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// --- Common Components ---

function SidebarLink({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all text-sm font-medium ${active ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
    >
      {icon} {label}
    </button>
  );
}

function StatCard({ title, value, unit, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-2xl`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{Math.round(value).toLocaleString()}<span className="text-sm font-normal text-gray-400 ml-1">{unit}</span></p>
      </div>
    </div>
  );
}

function StatsPeriodCard({ title, total, human, bot }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">{title}</h4>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">총 방문</span>
          <span className="text-2xl font-black text-gray-900">{total?.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
          <div>
            <p className="text-[10px] text-gray-400 mb-1">실제 사람</p>
            <p className="text-sm font-bold text-green-600">{human?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 mb-1">AI/검색봇</p>
            <p className="text-sm font-bold text-purple-600">{bot?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InquiryModal({ inquiry, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2"><MessageSquare size={20} /> 문의 상세 내용</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full"><RotateCw className="rotate-45" /></button>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <p className="text-xs text-gray-400 mb-1">성함</p>
              <p className="font-bold text-gray-900">{inquiry.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl">
              <p className="text-xs text-gray-400 mb-1">진료분야</p>
              <p className="font-bold text-primary">{inquiry.category}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-xs text-gray-400 mb-1">연락처</p>
            <p className="font-bold text-gray-900 text-lg">{inquiry.phone}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
            {inquiry.message || "내용이 없습니다."}
          </div>
          <button onClick={onClose} className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-opacity-90 transition-all">확인</button>
        </div>
      </div>
    </div>
  );
}
        </div>
      </div>
    </div>
  );
}
