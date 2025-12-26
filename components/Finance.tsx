
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

const Finance: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-white/20 rounded-lg">
              <ArrowUpCircle size={24} />
            </div>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">本月累計</span>
          </div>
          <div className="text-3xl font-bold mb-1">$8,245,000</div>
          <div className="text-indigo-100 opacity-80 text-sm">總營收收入</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ArrowDownCircle size={24} />
            </div>
            <span className="text-sm text-slate-500">本月支出</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">$1,890,000</div>
          <div className="text-slate-500 text-sm">薪資、房租及雜項</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Download size={24} />
            </div>
            <button className="text-sm text-indigo-600 font-bold hover:underline">匯出報表</button>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">$6,355,000</div>
          <div className="text-slate-500 text-sm">淨利潤 (估計)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-8">收入來源分析</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">最新帳務紀錄</h3>
            <button className="text-slate-500 hover:text-indigo-600 transition-colors">
              <Calendar size={20} />
            </button>
          </div>
          <div className="space-y-6">
            {[
              { label: '林公館案-第一期設計費', date: '2024-05-15', amount: 500000, type: 'income' },
              { label: '辦公室五月份房租', date: '2024-05-10', amount: -85000, type: 'expense' },
              { label: '全體員工端午獎金', date: '2024-05-08', amount: -450000, type: 'expense' },
              { label: '南港大樓案-執照掛件費', date: '2024-05-05', amount: 1200000, type: 'income' },
              { label: '採購繪圖站 (3台)', date: '2024-05-01', amount: -150000, type: 'expense' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {item.type === 'income' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.date}</div>
                  </div>
                </div>
                <div className={`font-mono font-bold ${
                  item.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
