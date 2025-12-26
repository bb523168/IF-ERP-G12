
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Wallet, 
  Scale, 
  Users, 
  Settings, 
  FileCheck, 
  BarChart3, 
  Building2,
  Bell,
  Search,
  UserCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { ModuleType } from './types';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Finance from './components/Finance';
import HR from './components/HR';
import Approval from './components/Approval';
import Reports from './components/Reports';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const navItems = [
    { type: ModuleType.DASHBOARD, icon: LayoutDashboard, label: '儀表板' },
    { type: ModuleType.PROJECTS, icon: Briefcase, label: '專案業務' },
    { type: ModuleType.FINANCE, icon: Wallet, label: '財務會計' },
    { type: ModuleType.LEGAL, icon: Scale, label: '合約法務' },
    { type: ModuleType.HR, icon: Users, label: '人力資源' },
    { type: ModuleType.ADMIN, icon: Building2, label: '管理行政' },
    { type: ModuleType.APPROVAL, icon: FileCheck, label: '線上簽核' },
    { type: ModuleType.REPORTS, icon: BarChart3, label: '統計報表' },
    { type: ModuleType.SETTINGS, icon: Settings, label: '系統設定' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return <Dashboard />;
      case ModuleType.PROJECTS: return <Projects />;
      case ModuleType.FINANCE: return <Finance />;
      case ModuleType.HR: return <HR />;
      case ModuleType.APPROVAL: return <Approval />;
      case ModuleType.REPORTS: return <Reports />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Building2 size={64} className="mb-4 opacity-20" />
          <h2 className="text-xl font-medium">功能開發中</h2>
          <p>此模組正在為「如果建築師事務所」量身打造...</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
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
          {navItems.map((item) => (
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

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsAIModalOpen(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity"
          >
            <Sparkles size={20} />
            {isSidebarOpen && <span className="font-medium">AI 事務所助手</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 text-slate-600">
            <h1 className="text-xl font-bold text-slate-800">
              {navItems.find(i => i.type === activeModule)?.label || '首頁'}
            </h1>
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 gap-2 border border-slate-200">
              <Search size={16} />
              <input type="text" placeholder="搜尋專案、合約或員工..." className="bg-transparent border-none outline-none text-sm w-64" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-800 leading-none">王大明 建築師</div>
                <div className="text-xs text-slate-500">主持建築師 / 管理員</div>
              </div>
              <UserCircle size={32} className="text-indigo-600" />
            </div>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderModule()}
        </div>
      </main>

      {/* AI Assistant Modal */}
      {isAIModalOpen && (
        <AIAssistant onClose={() => setIsAIModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
