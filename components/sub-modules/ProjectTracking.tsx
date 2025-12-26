
import React, { useState } from 'react';
import { Activity, Pencil, Trash2, Search, Filter } from 'lucide-react';

const ProjectTracking: React.FC = () => {
  const [trackingProjects] = useState([
    { id: '1', code: '25L-A01', name: '大安景觀豪宅', status: '設計中', progress: 45, date: '2025-01-10' },
    { id: '2', code: '25C-S02', name: '南港廠房公安', status: '施工中', progress: 75, date: '2025-02-15' },
    { id: '3', code: '25-U03', name: '新北社區都更', status: '報備中', progress: 20, date: '2025-03-01' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Activity className="text-indigo-600" size={20} /> 未結案專案進度追蹤
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input className="pl-9 pr-4 py-1.5 border rounded-lg text-sm" placeholder="搜尋專案..." />
          </div>
          <button className="p-1.5 border rounded-lg hover:bg-slate-50"><Filter size={18}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {trackingProjects.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{p.code}</span>
                <h4 className="font-bold text-lg text-slate-800 mt-1">{p.name}</h4>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"><Pencil size={16}/></button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-500">專案進度</span>
                <span className="text-indigo-600">{p.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                狀態：<span className="text-slate-600">{p.status}</span>
              </span>
              <span className="text-[11px] font-bold text-slate-400">建立日期：{p.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTracking;
