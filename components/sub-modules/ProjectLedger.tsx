
import React, { useState } from 'react';
import { CheckCircle2, Plus, Info, ChevronDown, Download, Filter } from 'lucide-react';

const ProjectLedger: React.FC = () => {
  const [activeProject, setActiveProject] = useState('25L-A01');

  // 收入期次常數
  const INCOME_PHASES = ['訂金', '建照掛號前', '取得建照', '開工', '結構體', '使照', '其他'];
  // 支出分項常數
  const EXPENSE_CATEGORIES = ['複委託 (機電/結構/消防/水保...)', '行政費 (規費/審查費...)', '稅捐 (代扣所得...)', '其他 (介紹費/雜支...)'];

  const incomeItems = [
    { id: 1, phase: '訂金', amount: 2400000, date: '2025-01-10', received: true },
    { id: 2, phase: '建照掛號前', amount: 3600000, date: '2025-03-05', received: true },
    { id: 3, phase: '取得建照', amount: 6000000, date: '待定', received: false },
  ];

  const expenseItems = [
    { id: 1, category: '複委託 (機電/結構/消防/水保...)', item: '結構技師事務所', amount: 500000, date: '2025-02-15', vendor: '王結構技師', paid: true },
    { id: 2, category: '行政費 (規費/審查費...)', item: '建照規費', amount: 15000, date: '2025-03-01', vendor: '台北市建管處', paid: true },
    { id: 3, category: '稅捐 (代扣所得...)', item: '10% 代扣所得', amount: 240000, date: '2025-01-15', vendor: '國稅局', paid: true },
  ];

  const totalIncome = incomeItems.reduce((sum, i) => sum + i.amount, 0);
  const receivedIncome = incomeItems.filter(i => i.received).reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6 pb-20">
      {/* 頂部篩選與標頭 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
            25
          </div>
          <div>
            <select 
              value={activeProject}
              onChange={(e) => setActiveProject(e.target.value)}
              className="text-xl font-bold text-slate-800 bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
            >
              <option value="25L-A01">25L-A01 | 大安景觀豪宅</option>
              <option value="25C-S02">25C-S02 | 南港廠房公安</option>
            </select>
            <div className="flex gap-4 text-xs font-bold text-slate-400 mt-1">
              <span>會計年度: 2025</span>
              <span>性質: A (建築設計)</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-xl text-sm font-bold hover:bg-slate-50 flex items-center gap-2">
            <Download size={16} /> 匯出帳冊
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            <Plus size={16} /> 新增收支
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
        {/* 左側：收入明細 */}
        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-6 flex justify-between items-center text-white">
            <div>
              <h3 className="font-bold text-lg">收入明細表</h3>
              <p className="text-white/70 text-xs">合約總額: ${totalIncome.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block opacity-70">尚未入帳</span>
              <span className="text-xl font-mono font-bold">${(totalIncome - receivedIncome).toLocaleString()}</span>
            </div>
          </div>
          
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">期次 / 收入項目</th>
                <th className="px-8 py-4 text-right">合約金額</th>
                <th className="px-8 py-4 text-right">入帳狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {incomeItems.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      <span className="font-bold text-slate-700">{item.phase}</span>
                    </div>
                    <div className="relative inline-block mt-1">
                      <button className="text-[10px] text-slate-400 flex items-center gap-1 hover:text-indigo-600 transition-colors">
                        設定類別 <ChevronDown size={12} />
                      </button>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-mono font-bold text-slate-800">
                    ${item.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono text-slate-400 mb-1">{item.date}</span>
                      {item.received ? (
                        <div className="flex items-center gap-1 text-green-500 font-bold text-[10px] bg-green-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={12} /> 已入帳
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-300 italic">待核實</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 右側：支出明細 */}
        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 flex justify-between items-center text-white">
            <div>
              <h3 className="font-bold text-lg">支出明細表</h3>
              <p className="text-white/70 text-xs">含複委託、行政費及稅捐</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block opacity-70">支出總計</span>
              <span className="text-xl font-mono font-bold">${expenseItems.reduce((s, e) => s + e.amount, 0).toLocaleString()}</span>
            </div>
          </div>
          
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">支出分類 / 項目</th>
                <th className="px-8 py-4">廠商名稱</th>
                <th className="px-8 py-4 text-right">金額</th>
                <th className="px-8 py-4 text-right">狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {expenseItems.map((item) => (
                <tr key={item.id} className="hover:bg-red-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="text-[10px] text-slate-400 font-bold mb-0.5">{item.category.split(' ')[0]}</div>
                    <div className="font-bold text-slate-700">{item.item}</div>
                  </td>
                  <td className="px-8 py-6">
                    <input 
                      defaultValue={item.vendor}
                      className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-red-400 focus:ring-0 text-xs font-medium w-full py-1 transition-all"
                      placeholder="填寫廠商..."
                    />
                  </td>
                  <td className="px-8 py-6 text-right font-mono font-bold text-slate-800">
                    ${item.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono text-slate-400 mb-1">{item.date}</span>
                      {item.paid ? (
                        <div className="flex items-center gap-1 text-red-500 font-bold text-[10px] bg-red-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={12} /> 已支付
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-300">待付款</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectLedger;
