
import React from 'react';
import { Calendar, UserCheck, TrendingUp, Info } from 'lucide-react';

const MOCK_DATA = [
  { name: '王大明', hireDate: '2020-01-01', used: 5 },
  { name: '李小美', hireDate: '2023-06-15', used: 2 },
  { name: '設計師甲', hireDate: '2024-11-01', used: 0 },
];

const AttendanceManagement: React.FC = () => {
  const calculateStats = (hireDate: string) => {
    const start = new Date(hireDate);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44);
    const years = Math.floor(diffMonths / 12);
    const months = Math.floor(diffMonths % 12);

    // 法定特休 logic
    let quota = 0;
    if (diffMonths >= 120) quota = 30; // 示意
    else if (diffMonths >= 12) quota = 7 + (years - 1);
    else if (diffMonths >= 6) quota = 3;

    return { years, months, quota };
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">年度特休統計</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={20}/></div>
          </div>
          <p className="text-3xl font-bold">85%</p>
          <p className="text-xs text-slate-400 mt-2">事務所整體特休執行率</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">員工假別配額 (自動計算年資)</h3>
          <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
            <TrendingUp size={16} /> 下載全年度彙總
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase">
            <tr>
              <th className="px-8 py-4">員工姓名 / 入職日</th>
              <th className="px-8 py-4">當前年資</th>
              <th className="px-8 py-4">特休配額進度</th>
              <th className="px-8 py-4 text-right">剩餘天數</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {MOCK_DATA.map(emp => {
              const { years, months, quota } = calculateStats(emp.hireDate);
              const remaining = quota - emp.used;
              const percent = (emp.used / quota) * 100 || 0;

              return (
                <tr key={emp.name}>
                  <td className="px-8 py-6">
                    <div className="font-bold">{emp.name}</div>
                    <div className="text-xs text-slate-400 font-mono">{emp.hireDate}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg text-xs font-bold">
                      {years}年 {months}月
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="w-full h-2 bg-slate-100 rounded-full mb-1">
                      <div className="h-full bg-indigo-500 rounded-full" style={{width: `${percent}%`}} />
                    </div>
                    <div className="text-[10px] text-slate-400">已使用 {emp.used} / 共 {quota} 天</div>
                  </td>
                  <td className="px-8 py-6 text-right font-bold text-lg text-slate-800">
                    {remaining} <span className="text-xs text-slate-400">天</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceManagement;
