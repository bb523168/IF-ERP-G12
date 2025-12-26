
import React, { useState } from 'react';
import { 
  FolderKanban, 
  Activity, 
  Layers, 
  Mic2, 
  UserSquare2, 
  FileSpreadsheet 
} from 'lucide-react';
import ProjectManagement from './sub-modules/ProjectManagement';
import ProjectTracking from './sub-modules/ProjectTracking';
import CustomerManagement from './sub-modules/CustomerManagement';
import QuotationManagement from './sub-modules/QuotationManagement';
import MeetingMinutes from './sub-modules/MeetingMinutes';
import DocumentManagement from './sub-modules/DocumentManagement';
import { User } from '../types';

const ProjectModule: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('mgmt');

  const tabs = [
    { id: 'mgmt', label: '專案管理', icon: FolderKanban },
    { id: 'track', label: '專案追蹤', icon: Activity },
    { id: 'docs', label: '文件與翻譯', icon: Layers },
    { id: 'minutes', label: '會議記錄', icon: Mic2 },
    { id: 'customer', label: '客戶管理', icon: UserSquare2 },
    { id: 'quote', label: '報價單', icon: FileSpreadsheet },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'mgmt': return <ProjectManagement user={user} />;
      case 'track': return <ProjectTracking />;
      case 'docs': return <DocumentManagement />;
      case 'customer': return <CustomerManagement user={user} />;
      case 'quote': return <QuotationManagement user={user} />;
      case 'minutes': return <MeetingMinutes />;
      default:
        return (
          <div className="p-12 text-center text-slate-400">
            <Activity size={48} className="mx-auto mb-4 opacity-20" />
            <p>此功能開發中...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-slate-200 px-8 overflow-x-auto">
        <div className="flex gap-8 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600 translate-y-[1px]' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProjectModule;
