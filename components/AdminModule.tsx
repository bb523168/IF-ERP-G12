
import React, { useState } from 'react';
import { 
  FileCheck, 
  Archive, 
  Stamp, 
  Clock, 
  CreditCard, 
  Calendar,
  PenTool,
  History,
  Trash2,
  Download
} from 'lucide-react';
import { User } from '../types';
import AttendanceManagement from './sub-modules/AttendanceManagement';
import LendingManagement from './sub-modules/LendingManagement';

const AdminModule: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('attendance');

  const tabs = [
    { id: 'approvals', label: '簽核作業', icon: FileCheck },
    { id: 'docs', label: '公文管理', icon: Archive },
    { id: 'lending', label: '借出紀錄', icon: Stamp },
    { id: 'attendance', label: '差勤管理', icon: Clock },
    { id: 'procurement', label: '總務採購', icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance': return <AttendanceManagement />;
      case 'lending': return <LendingManagement />;
      default:
        return (
          <div className="p-12 text-center text-slate-400">
            <Archive size={48} className="mx-auto mb-4 opacity-20" />
            <p>行政管理模組：{tabs.find(t => t.id === activeTab)?.label} 正在維修中...</p>
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
              className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600' 
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

export default AdminModule;
