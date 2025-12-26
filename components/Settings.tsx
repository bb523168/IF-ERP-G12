
import React from 'react';
import { User, ShieldCheck, Database, FileSignature, Layers, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface SettingsProps {
  user: { role: UserRole };
  onUpdateRole: (role: UserRole) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateRole }) => {
  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">系統設定中心</h2>
        <div className="bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 flex items-center gap-2">
          <ShieldCheck size={20} className="text-indigo-600" />
          <span className="text-sm font-bold text-indigo-700">當前身份：{user.role}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><User size={20}/></div>
            <h3 className="font-bold text-lg">權限切換 (調試用)</h3>
          </div>
          <div className="space-y-3">
            {(['建築師', '經理', '設計師'] as UserRole[]).map(r => (
              <button 
                key={r}
                onClick={() => onUpdateRole(r)}
                className={`w-full flex justify-between items-center p-4 rounded-2xl border transition-all ${
                  user.role === r ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-indigo-200'
                }`}
              >
                <span className="font-bold">{r}</span>
                <ArrowRight size={18} className={user.role === r ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>
          <p className="mt-4 text-[10px] text-slate-400 leading-relaxed">
            * 建築師：擁有系統所有編輯與查看權限。<br/>
            * 經理：擁有大部分查看與新增權限。<br/>
            * 設計師：隱藏敏感財務、報表與法務內容。
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FileSignature size={20}/></div>
            <h3 className="font-bold text-lg">電子印章與職銜</h3>
          </div>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-200 p-8 text-center rounded-2xl group hover:border-indigo-400 transition-colors cursor-pointer">
              <p className="text-sm text-slate-400 mb-2">上傳建築師電子職章 (PNG)</p>
              <div className="w-24 h-24 bg-slate-50 mx-auto rounded-full flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                <FileSignature size={32} />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-[10px] text-slate-400">
              <span className="font-bold block mb-1">簽核對象維護：</span>
              1. 建築師正章 / 副章<br/>
              2. 原子章 A/B/C 系列
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
