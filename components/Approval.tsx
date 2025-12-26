
import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { ApprovalRequest } from '../types';

const MOCK_APPROVALS: ApprovalRequest[] = [
  { id: '1', title: '臺北市住宅設計案-追加預算', requester: '陳工程師', status: '待審核', date: '2024-05-18' },
  { id: '2', title: '辦公室耗材採購 (印表機碳粉)', requester: '王行政', status: '已核准', date: '2024-05-17' },
  { id: '3', title: '特休申請 - 李小美', requester: '李小美', status: '待審核', date: '2024-05-18' },
  { id: '4', title: '合約法務修訂建議 - 林公館', requester: '張法務', status: '駁回', date: '2024-05-16' },
];

const Approval: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">待簽核事項</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold flex items-center gap-2">
            <Clock size={14} /> 2 個待處理
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_APPROVALS.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${
                app.status === '待審核' ? 'bg-amber-50 text-amber-600' :
                app.status === '已核准' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{app.title}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    申請人: <span className="font-bold">{app.requester}</span>
                  </span>
                  <span className="text-sm text-slate-400">•</span>
                  <span className="text-sm text-slate-500">{app.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {app.status === '待審核' ? (
                <>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2">
                    <CheckCircle2 size={16} /> 核准
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2">
                    <XCircle size={16} /> 駁回
                  </button>
                </>
              ) : (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${
                  app.status === '已核准' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {app.status === '已核准' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {app.status}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approval;
