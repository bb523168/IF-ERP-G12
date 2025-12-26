
import React, { useState } from 'react';
import { Plus, Filter, MoreVertical, Search, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  { id: '1', name: '大安區景觀豪宅案', client: '林先生', status: '設計中', progress: 45, budget: 12000000 },
  { id: '2', name: '南港商辦大樓', client: '國泰建設', status: '執照申請', progress: 65, budget: 85000000 },
  { id: '3', name: '台中集合住宅案', client: '興富發', status: '施工中', progress: 30, budget: 150000000 },
  { id: '4', name: '陽明山別墅改建', client: '陳夫人', status: '已結案', progress: 100, budget: 6500000 },
  { id: '5', name: '新竹科園廠房增建', client: '台積電', status: '設計中', progress: 15, budget: 45000000 },
];

const Projects: React.FC = () => {
  const [projects] = useState<Project[]>(MOCK_PROJECTS);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case '設計中': return 'bg-blue-100 text-blue-700';
      case '執照申請': return 'bg-amber-100 text-amber-700';
      case '施工中': return 'bg-purple-100 text-purple-700';
      case '已結案': return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜尋專案名稱、業主或關鍵字..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
            <Filter size={18} />
            篩選
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm">
            <Plus size={18} />
            新增專案
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-medium uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">專案名稱</th>
              <th className="px-6 py-4">業主</th>
              <th className="px-6 py-4">進度</th>
              <th className="px-6 py-4">預算 (TWD)</th>
              <th className="px-6 py-4">狀態</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600 cursor-pointer flex items-center gap-2">
                    {p.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">ID: PRJ-{p.id}2024</div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{p.client}</td>
                <td className="px-6 py-4">
                  <div className="w-full max-w-xs flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                        style={{ width: `${p.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 font-mono">
                  ${p.budget.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
