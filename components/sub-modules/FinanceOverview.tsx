
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Download, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PIE_DATA = [
  { name: '設計服務費', value: 4500000 },
  { name: '執照代辦', value: 1200000 },
  { name: '工程監造', value: 2500000 },
  { name: '其他收入', value: 500000 },
];
const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f59e0b'];

const FinanceOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-white/20 rounded-lg"><ArrowUpCircle size={24} /></div>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">本月累計</span>
          </div>
          <div className="text-3xl font-bold mb-1">$8,245,000</div>
          <div className="text-indigo-100 opacity-80 text-sm">總營收收入</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><ArrowDownCircle size={24} /></div>
            <span className="text-sm text-slate-500">本月支出</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">$1,890,000</div>
          <div className="text-slate-500 text-sm">執行業務費用支出</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Download size={24} /></div>
            <button className="text-sm text-indigo-600 font-bold hover:underline">匯出損益表</button>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">$6,355,000</div>
          <div className="text-slate-500 text-sm">本月預估淨利</div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-8">收入來源分析</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                {PIE_DATA.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default FinanceOverview;
