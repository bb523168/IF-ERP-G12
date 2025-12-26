
import React, { useState } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Receipt, 
  CreditCard, 
  Calculator, 
  BadgeDollarSign, 
  History,
  FilePieChart,
  Box,
  SearchCode
} from 'lucide-react';
import ProjectLedger from './sub-modules/ProjectLedger';
import SalaryManagement from './sub-modules/SalaryManagement';
import JournalEntries from './sub-modules/JournalEntries';
import AccountsReceivable from './sub-modules/AccountsReceivable';
import FinanceOverview from './sub-modules/FinanceOverview';
import IncomeVouchers from './sub-modules/IncomeVouchers';
import ProfitLossStatement from './sub-modules/ProfitLossStatement';

const FinanceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '財務總覽', icon: BarChart3 },
    { id: 'ledger', label: '專案收支帳冊', icon: BookOpen },
    { id: 'receivable', label: '應收帳款', icon: CreditCard },
    { id: 'vouchers', label: '收入憑證', icon: Receipt },
    { id: 'journal', label: '分錄帳', icon: Calculator },
    { id: 'salary', label: '薪資管理', icon: BadgeDollarSign },
    { id: 'pl', label: '損益表', icon: FilePieChart },
    { id: 'assets', label: '固定資產', icon: Box },
    { id: 'settings', label: '資料設定', icon: SearchCode },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <FinanceOverview />;
      case 'ledger': return <ProjectLedger />;
      case 'receivable': return <AccountsReceivable />;
      case 'journal': return <JournalEntries />;
      case 'salary': return <SalaryManagement />;
      case 'vouchers': return <IncomeVouchers />;
      case 'pl': return <ProfitLossStatement />;
      default:
        return (
          <div className="p-12 text-center text-slate-400">
            <History size={48} className="mx-auto mb-4 opacity-20" />
            <p>「{tabs.find(t => t.id === activeTab)?.label}」功能開發中...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-slate-200 px-8 overflow-x-auto custom-scrollbar">
        <div className="flex gap-8 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-all ${
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
      <div className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default FinanceModule;
