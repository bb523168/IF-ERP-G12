
import React, { useState } from 'react';
import { Search, Filter, Calendar, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { AccountReceivable } from '../../types';

const INITIAL_AR: AccountReceivable[] = [
  { 
    id: 'AR001', 
    projectCode: '25L-A01', 
    phase: '第一期(訂金)', 
    amount: 2400000, 
    withholdingTax: 240000, 
    netAmount: 2160000, 
    billingDate: '2025-01-05', 
    receivedDate: '2025-01-15', 
    status: '已收訖' 
  },
  { 
    id: 'AR002', 
    projectCode: '25L-A01', 
    phase: '第二期(建照)', 
    amount: 3600000, 
    withholdingTax: 360000, 
    netAmount: 3240000, 
    billingDate: '2025-03-01', 
    status: '請款中' 
  },
  { 
    id: 'AR003', 
    projectCode: '25C-S02', 
    phase: '尾款', 
    amount: 150000, 
    withholdingTax: 15000, 
    netAmount: 135000, 
    billingDate: '待定', 
    status: '未達請款條件' 
  },
];

const AccountsReceivable: React.FC = () => {
  const [data, setData] = useState(INITIAL_AR);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已收訖': return 'bg-green-100 text-green-700 border-green-200';
      case '請款中': return 'bg-amber-100 text-amber-700 border-amber-200';
      case '已收期票': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <CreditCard className="text-indigo-600" /> 應收帳款追蹤清單
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input className="pl-9 pr-4 py-2 border rounded-xl text-sm w-64 outline-none focus:ring-2 focus:ring-indigo-500/10" placeholder="搜尋編號或專案..." />
          </div>
          <button className="p-2 border rounded-xl hover:bg-slate-50"><Filter size={18}/></button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-100">
            <RefreshCw size={16} /> 更新狀態
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-x-auto shadow-sm custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-slate-400 font-bold uppercase tracking-widest">
              <th className="px-6 py-5">合約編碼 / 期次</th>
              <th className="px-6 py-5 text-right">合約總額</th>
              <th className="px-6 py-5 text-right">代扣所得</th>
              <th className="px-6 py-5 text-right">實收淨額</th>
              <th className="px-6 py-5">請款日期</th>
              <th className="px-6 py-5">狀態</th>
              <th className="px-6 py-5">票兌/匯款日</th>
              <th className="px-6 py-5 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-indigo-50/20 transition-colors">
                <td className="px-6 py-6">
                  <div className="font-bold text-slate-900 text-sm mb-0.5">{item.projectCode}</div>
                  <div className="text-slate-400 font-medium">{item.phase}</div>
                </td>
                <td className="px-6 py-6 text-right font-mono font-bold text-slate-800">
                  ${item.amount.toLocaleString()}
                </td>
                <td className="px-6 py-6 text-right font-mono text-red-400">
                  -${item.withholdingTax.toLocaleString()}
                </td>
                <td className="px-6 py-6 text-right font-mono font-black text-indigo-600 text-sm">
                  ${item.netAmount.toLocaleString()}
                </td>
                <td className="px-6 py-6 font-medium text-slate-500">{item.billingDate}</td>
                <td className="px-6 py-6">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-bold ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <input 
                    type="date" 
                    defaultValue={item.receivedDate || item.remittanceDate}
                    className="bg-transparent border-none p-0 text-xs font-mono outline-none focus:ring-0"
                  />
                </td>
                <td className="px-6 py-6 text-center">
                  <button className="text-indigo-600 hover:underline font-bold">核實入帳</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
import { CreditCard } from 'lucide-react';
export default AccountsReceivable;
