
import React from 'react';
import { FilePieChart, Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const ProfitLossStatement: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <FilePieChart className="text-indigo-600" /> 執行業務所得損益表
        </h2>
        <div className="flex gap-2">
          <select className="bg-white border rounded-xl px-4 py-2 text-sm font-bold outline-none">
            <option>2025 年度</option>
            <option>2024 年度</option>
          </select>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Download size={18} /> 匯出損益表 (PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
             <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><TrendingUp size={24}/></div>
             <h3 className="font-bold text-lg text-slate-800">收入總額 (Revenue)</h3>
           </div>
           <div className="space-y-6">
              {[
                { label: '設計服務費', amount: 8500000, percent: 75 },
                { label: '監造服務費', amount: 2000000, percent: 18 },
                { label: '代辦服務費', amount: 800000, percent: 7 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-900">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full" style={{width: `${item.percent}%`}} />
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t flex justify-between items-center">
                 <span className="font-black text-slate-400 text-xs uppercase tracking-widest">總計收入</span>
                 <span className="text-3xl font-black text-indigo-600 font-mono">$11,300,000</span>
              </div>
           </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
             <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><TrendingDown size={24}/></div>
             <h3 className="font-bold text-lg text-slate-800">費用總額 (Expenses)</h3>
           </div>
           <div className="space-y-6">
              {[
                { label: '薪資支出', amount: 3200000, percent: 55 },
                { label: '複委託費', amount: 1500000, percent: 25 },
                { label: '租金及雜支', amount: 1100000, percent: 20 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-900">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 rounded-full">
                    <div className="h-full bg-red-400 rounded-full" style={{width: `${item.percent}%`}} />
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t flex justify-between items-center">
                 <span className="font-black text-slate-400 text-xs uppercase tracking-widest">總計支出</span>
                 <span className="text-3xl font-black text-red-500 font-mono">$5,800,000</span>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-indigo-600 p-10 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-indigo-100">
         <div>
           <h3 className="text-3xl font-black mb-2">預估淨利額</h3>
           <p className="text-indigo-100 font-bold opacity-70 tracking-[0.2em] uppercase text-xs">Architect Firm Estimated Net Income</p>
         </div>
         <div className="text-center md:text-right mt-6 md:mt-0">
           <div className="text-6xl font-black font-mono tracking-tighter">$5,500,000</div>
           <div className="text-sm font-bold bg-white/20 inline-block px-4 py-1 rounded-full mt-4">淨利率: 48.7%</div>
         </div>
      </div>
    </div>
  );
};

export default ProfitLossStatement;
