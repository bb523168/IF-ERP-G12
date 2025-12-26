
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Plus, 
  Download, 
  FileText, 
  Printer, 
  Calculator,
  Pencil,
  X,
  TrendingUp,
  UserCircle
} from 'lucide-react';
import { SalaryRecord } from '../../types';

const SalaryManagement: React.FC = () => {
  const [view, setView] = useState<'monthly' | 'annual'>('monthly');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('2025-05');
  const [editingRecord, setEditingRecord] = useState<SalaryRecord | null>(null);

  const [records, setRecords] = useState<SalaryRecord[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: '李小美',
      month: '2025-05',
      baseSalary: 45000,
      allowance: 3000,
      overtime: 2500,
      bonus: 0,
      laborInsurance: 1200,
      withholdingTax: 0,
      leaveDeduction: 0,
      netSalary: 49300
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: '王大明',
      month: '2025-05',
      baseSalary: 120000,
      allowance: 10000,
      overtime: 0,
      bonus: 50000,
      laborInsurance: 4500,
      withholdingTax: 8000,
      leaveDeduction: 0,
      netSalary: 167500
    }
  ]);

  const totalPaid = records.reduce((sum, r) => sum + r.netSalary, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
          <button 
            onClick={() => setView('monthly')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'monthly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            月薪作業
          </button>
          <button 
            onClick={() => setView('annual')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'annual' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            個人年度報表
          </button>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="month" value={currentMonth} onChange={e => setCurrentMonth(e.target.value)} className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none" />
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Plus size={18} /> 新增薪資單
          </button>
        </div>
      </div>

      {view === 'monthly' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">本月薪資總人數</p>
                <div className="text-3xl font-black text-slate-800">{records.length} <span className="text-sm font-medium">人</span></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">本月實發總金額</p>
                <div className="text-3xl font-black text-slate-800">${totalPaid.toLocaleString()}</div>
              </div>
            </div>
            <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-200 flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-all">
              <button className="flex items-center gap-3 text-white font-bold">
                <Download size={24} />
                <span>匯出銀行轉帳媒體檔</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  <th className="px-8 py-5">員工姓名</th>
                  <th className="px-8 py-5 text-right">本薪 + 津貼 + 加班 + 獎金</th>
                  <th className="px-8 py-5 text-right">勞健保 + 代扣稅 + 請假</th>
                  <th className="px-8 py-5 text-right">實發金額</th>
                  <th className="px-8 py-5 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {records.map(r => (
                  <tr key={r.id} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">{r.employeeName[0]}</div>
                        <div className="font-bold text-slate-800">{r.employeeName}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right text-indigo-600 font-bold">
                      +${(r.baseSalary + r.allowance + r.overtime + r.bonus).toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-right text-red-400">
                      -${(r.laborInsurance + r.withholdingTax + r.leaveDeduction).toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-right font-mono font-black text-slate-900 text-lg">
                      ${r.netSalary.toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => { setEditingRecord(r); setIsEditModalOpen(true); }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all"
                      >
                        <Pencil size={18}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
             <div className="w-32 h-32 rounded-[32px] bg-slate-100 flex items-center justify-center text-5xl font-bold text-slate-400 shrink-0">李</div>
             <div className="flex-1 text-center md:text-left">
               <h3 className="text-3xl font-black text-slate-800 mb-2">李小美</h3>
               <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">資深專案經理 • 專案一部</p>
               <div className="flex gap-4 mt-6 justify-center md:justify-start">
                 <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-slate-200">
                   <Printer size={18} /> 列印年度扣繳憑單
                 </button>
                 <button className="p-3 border rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
                   <Download size={20} />
                 </button>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 text-center min-w-[160px]">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">年度實領總額</span>
                  <span className="text-2xl font-black text-indigo-700">$582,000</span>
                </div>
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 text-center min-w-[160px]">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-1">年度勞健保自付</span>
                  <span className="text-2xl font-black text-red-700">$14,400</span>
                </div>
             </div>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold flex items-center gap-2"><TrendingUp size={20} className="text-indigo-600"/> 2025 年度薪資變化趨勢</h4>
              <span className="text-xs font-bold text-slate-400">YEAR: 2025</span>
            </div>
            <div className="p-8 text-center text-slate-300 italic">
              年度數據圖表生成中...
            </div>
          </div>
        </div>
      )}

      {/* 薪資單編輯彈窗 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl p-10 flex flex-col animate-slide-in">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-800">編輯薪資單 <span className="text-indigo-600 ml-2">[{editingRecord?.employeeName}]</span></h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={24}/></button>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 space-y-10 custom-scrollbar">
              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Calculator size={18}/></div>
                  <h4 className="font-bold text-lg">加項設定 (Earnings)</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-600">本薪 (Base Salary)</label>
                    <input type="number" defaultValue={editingRecord?.baseSalary} className="border rounded-xl px-4 py-2 text-right font-mono font-bold w-40 outline-none focus:ring-4 focus:ring-indigo-500/10" />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-600">職務津貼 (Allowance)</label>
                    <input type="number" defaultValue={editingRecord?.allowance} className="border rounded-xl px-4 py-2 text-right font-mono font-bold w-40 outline-none" />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-indigo-600">加班費 (Overtime)</label>
                    <input type="number" defaultValue={editingRecord?.overtime} className="bg-indigo-50 border-none rounded-xl px-4 py-2 text-right font-mono font-bold w-40 outline-none" />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-indigo-600">本月獎金 (Bonus)</label>
                    <input type="number" defaultValue={editingRecord?.bonus} className="bg-indigo-50 border-none rounded-xl px-4 py-2 text-right font-mono font-bold w-40 outline-none" />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-2">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg"><TrendingUp size={18} className="rotate-180"/></div>
                  <h4 className="font-bold text-lg">減項設定 (Deductions)</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-600">勞健保自付額</label>
                    <input type="number" defaultValue={editingRecord?.laborInsurance} className="border rounded-xl px-4 py-2 text-right font-mono font-bold w-40 outline-none" />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-600">代扣稅額 (Tax)</label>
                    <input type="number" defaultValue={editingRecord?.withholdingTax} className="border rounded-xl px-4 py-2 text-right font-mono font-bold w-40 outline-none" />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-red-600">請假扣款 (Leave)</label>
                    <input type="number" defaultValue={editingRecord?.leaveDeduction} className="bg-red-50 border-none rounded-xl px-4 py-2 text-right font-mono font-bold w-40 outline-none" />
                  </div>
                </div>
              </section>
            </div>

            <div className="pt-10 border-t border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">本月預計實發金額</span>
                  <span className="text-3xl font-black text-slate-900 font-mono tracking-tighter">${editingRecord?.netSalary.toLocaleString()}</span>
                </div>
                <div className="text-xs text-slate-400 font-medium text-right">
                  自動計算中...
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 border rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">取消</button>
                <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">確認儲存薪資單</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryManagement;
