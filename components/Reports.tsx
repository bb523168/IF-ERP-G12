
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Q1', 營收: 4500, 利潤: 2100, 案件數: 12 },
  { name: 'Q2', 營收: 5200, 利潤: 2800, 案件數: 15 },
  { name: 'Q3', 營收: 3800, 利潤: 1500, 案件數: 10 },
  { name: 'Q4', 營收: 7100, 利潤: 4200, 案件數: 22 },
];

const Reports: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">經營分析報表</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            匯出 Excel
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
            更新數據
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">年度季度營收利潤對比</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip />
                <Legend />
                <Bar dataKey="營收" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="利潤" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">接案數量趨勢</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip />
                <Line type="monotone" dataKey="案件數" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 p-10 rounded-3xl text-white">
        <div className="max-w-3xl">
          <h3 className="text-2xl font-bold mb-4">管理決策建議 (AI 生成)</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            根據當前季度數據顯示，Q4 的營收增長顯著，主要來自「大型商辦專案」的尾款。建議事務所於 Q1 增加「永續建築」相關的行銷投入，目前的案件庫存足以支持明年上半年運作，但需注意人才招募速度，以應對日益增加的案件量。
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-sm">
              <span className="block text-slate-500 text-xs">建議招募人數</span>
              <span className="font-bold text-lg text-indigo-400">3-5 名</span>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-sm">
              <span className="block text-slate-500 text-xs">資源分配指數</span>
              <span className="font-bold text-lg text-green-400">高效</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
