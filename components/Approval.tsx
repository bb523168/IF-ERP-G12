
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle, FileText, Search, Filter, ChevronRight } from 'lucide-react';
import { ApprovalRequest } from '../types';

const INITIAL_APPROVALS: ApprovalRequest[] = [
  { id: '1', title: '臺北市住宅設計案-追加預算', requester: '陳工程師', status: '待審核', date: '2024-05-18' },
  { id: '2', title: '辦公室耗材採購 (印表機碳粉)', requester: '王行政', status: '已核准', date: '2024-05-17' },
  { id: '3', title: '特休申請 - 李小美', requester: '李小美', status: '待審核', date: '2024-05-18' },
  { id: '4', title: '合約法務修訂建議 - 林公館', requester: '張法務', status: '駁回', date: '2024-05-16' },
];

const Approval: React.FC = () => {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [filter, setFilter] = useState<'All' | '待審核' | '已核准' | '駁回'>('All');

  const handleUpdateStatus = (id: string, newStatus: ApprovalRequest['status']) => {
    setApprovals(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const filteredApprovals = filter === 'All' 
    ? approvals 
    : approvals.filter(a => a.status === filter);

  const pendingCount = approvals.filter(a => a.status === '待審核').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">線上簽核流程管理</h2>
          <p className="text-slate-500 text-sm mt-1">審閱並核定事務所內部各項申請案件</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            {(['All', '待審核', '已核准', '駁回'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === f ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {f === 'All' ? '全部' : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {pendingCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-800 animate-pulse">
          <Clock size={20} />
          <span className="text-sm font-bold">當前有 {pendingCount} 個案件等待您的核示</span>
        </div>
      )}

      <div className="space-y-4">
        {filteredApprovals.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl transition-colors ${
                app.status === '待審核' ? 'bg-amber-50 text-amber-600' :
                app.status === '已核准' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <FileText size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{app.title}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    申請人: <span className="font-bold text-slate-700">{app.requester}</span>
                  </span>
                  <span className="text-sm text-slate-300">•</span>
                  <span className="text-sm text-slate-500 flex items-center gap-1 font-mono">{app.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {app.status === '待審核' ? (
                <>
                  <button 
                    onClick={() => handleUpdateStatus(app.id, '已核准')}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <CheckCircle2 size={18} /> 核准
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(app.id, '駁回')}
                    className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95 flex items-center gap-2"
                  >
                    <XCircle size={18} /> 駁回
                  </button>
                </>
              ) : (
                <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold ${
                  app.status === '已核准' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {app.status === '已核准' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  {app.status}
                </div>
              )}
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
        {filteredApprovals.length === 0 && (
          <div className="py-20 text-center text-slate-400 font-medium">
            目前沒有符合條件的簽核事項
          </div>
        )}
      </div>
    </div>
  );
};

export default Approval;
