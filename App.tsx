
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Wallet, 
  Scale, 
  Users, 
  Settings as SettingsIcon, 
  FileCheck, 
  BarChart3, 
  Building2,
  Bell,
  Search,
  UserCircle,
  Menu,
  Sparkles,
  LogOut
} from 'lucide-react';
import { ModuleType, User, UserRole } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectModule from './components/ProjectModule';
import FinanceModule from './components/FinanceModule';
import LegalModule from './components/LegalModule';
import HR from './components/HR';
import AdminModule from './components/AdminModule';
import Approval from './components/Approval';
import Reports from './components/Reports';
import Settings from './components/Settings';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // 權限過濾：設計師不能看財務、報表、法務
  const navItems = [
    { type: ModuleType.DASHBOARD, icon: LayoutDashboard, label: '儀表板', roles: ['建築師', '經理', '設計師'] },
    { type: ModuleType.PROJECTS, icon: Briefcase, label: '專案業務', roles: ['建築師', '經理', '設計師'] },
    { type: ModuleType.FINANCE, icon: Wallet, label: '財務會計', roles: ['建築師', '經理'] },
    { type: ModuleType.LEGAL, icon: Scale, label: '合約法務', roles: ['建築師', '經理'] },
    { type: ModuleType.HR, icon: Users, label: '人力資源', roles: ['建築師', '經理', '設計師'] },
    { type: ModuleType.ADMIN, icon: Building2, label: '管理行政', roles: ['建築師', '經理', '設計師'] },
    { type: ModuleType.APPROVAL, icon: FileCheck, label: '線上簽核', roles: ['建築師', '經理', '設計師'] },
    { type: ModuleType.REPORTS, icon: BarChart3, label: '統計報表', roles: ['建築師', '經理'] },
    { type: ModuleType.SETTINGS, icon: SettingsIcon, label: '系統設定', roles: ['建築師', '經理', '設計師'] },
  ];

  const visibleItems = navItems.filter(item => {
    if (!currentUser || !currentUser.role) return false;
    return (item.roles || []).includes(currentUser.role);
  });

  if (!currentUser) {
    return <Login onLogin={(user) => setCurrentUser(user)} />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return <Dashboard />;
      case ModuleType.PROJECTS: return <ProjectModule user={currentUser} />;
      case ModuleType.FINANCE: return <FinanceModule />;
      case ModuleType.LEGAL: return <LegalModule user={currentUser} />;
      case ModuleType.HR: return <HR />;
      case ModuleType.ADMIN: return <AdminModule user={currentUser} />;
      case ModuleType.APPROVAL: return <Approval />;
      case ModuleType.REPORTS: return <Reports />;
      case ModuleType.SETTINGS: return <Settings user={currentUser} onUpdateRole={(role) => setCurrentUser({...currentUser, role})} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900 text-white flex flex-col z-20`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold">IF</div>
              <span className="font-bold text-lg tracking-tight truncate">如果建築師</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleItems.map((item) => (
            <button
              key={item.type}
              onClick={() => setActiveModule(item.type)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeModule === item.type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={() => setIsAIModalOpen(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity"
          >
            <Sparkles size={20} />
            {isSidebarOpen && <span className="font-medium">AI 事務所助手</span>}
          </button>
          <button 
            onClick={() => setCurrentUser(null)}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">登出系統</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 text-slate-600">
            <h1 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              {visibleItems.find(i => i.type === activeModule)?.label || '首頁'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
              <span className="text-xs font-bold text-slate-500">{currentUser?.role}</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <UserCircle size={32} className="text-indigo-600" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {renderModule()}
        </div>
      </main>

      {isAIModalOpen && <AIAssistant onClose={() => setIsAIModalOpen(false)} />}
    </div>
  );
};

export default App;
