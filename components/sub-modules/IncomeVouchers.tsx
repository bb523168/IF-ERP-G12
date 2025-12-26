
import React, { useState } from 'react';
import { Receipt, Search, Plus, Filter, FileText } from 'lucide-react';
import { IncomeVoucher } from '../../types';

const IncomeVouchers: React.FC = () => {
  const [vouchers] = useState<IncomeVoucher[]>([
    { id: '1', code: '25L-A01-01', date: '2025-01-15', projectId: '25L-A01', amount: 2400000, description: '第一期期款(訂金)' },
    { id: '2', code: '25C-S02-01', date: '2025-02-10', projectId: '25C-S02', amount: 85000, description: '公安申報代辦費' },
  ]);

  return (
    <div className="space-y-6">
       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <Receipt className="text-indigo-600" /> 開出收入憑證紀錄
        </h2>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-100">
            <Plus size={18} /> 新增憑證
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">開立日期</th>
              <th className="px-8 py-5">憑證編號 (合約+流水)</th>
              <th className="px-8 py-5">對應專案</th>
              <th className="px-8 py-5">摘要說明</th>
              <th className="px-8 py-5 text-right">憑證金額</th>
              <th className="px-8 py-5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {vouchers.map(v => (
              <tr key={v.id} className="hover:bg-slate-50">
                <td className="px-8 py-6 font-mono text-slate-500">{v.date}</td>
                <td className="px-8 py-6 font-bold text-indigo-600">{v.code}</td>
                <td className="px-8 py-6 font-medium text-slate-700">{v.projectId}</td>
                <td className="px-8 py-6 text-slate-500">{v.description}</td>
                <td className="px-8 py-6 text-right font-mono font-bold">${v.amount.toLocaleString()}</td>
                <td className="px-8 py-6 text-right">
                  <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors"><FileText size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeVouchers;
