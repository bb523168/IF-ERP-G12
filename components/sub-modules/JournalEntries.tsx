
import React, { useState } from 'react';
import { Sparkles, Loader2, Save, Calculator, AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { FinanceEntry } from '../../types';

const JournalEntries: React.FC = () => {
  const [entries, setEntries] = useState<FinanceEntry[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<FinanceEntry>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    debitAccount: '',
    creditAccount: '',
    taxCategory: ''
  });

  const handleAiAssist = async () => {
    if (!newEntry.description) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `作為建築師事務所的專業會計助手，請分析此分錄摘要：「${newEntry.description}」。
        請根據「執行業務所得支出分類」(薪資、伙食費、租金、文具用品、複委託、修繕費、差旅費等) 提供建議。
        請以 JSON 格式回應：{"debit": "借方科目", "credit": "貸方科目", "category": "支出分類建議", "explanation": "簡短理由"}`,
      });
      
      const result = JSON.parse(response.text || '{}');
      setNewEntry(prev => ({
        ...prev,
        debitAccount: result.debit || prev.debitAccount,
        creditAccount: result.credit || prev.creditAccount,
        taxCategory: result.category || prev.taxCategory
      }));
    } catch (e) {
      console.error("AI Analysis failed:", e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    if (!newEntry.description || !newEntry.amount) return;
    setEntries([{ ...newEntry, id: Math.random().toString() } as FinanceEntry, ...entries]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: 0,
      debitAccount: '',
      creditAccount: '',
      taxCategory: ''
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
        
        <h3 className="text-2xl font-black mb-8 flex items-center gap-3 relative z-10">
          <Calculator className="text-indigo-600" /> 錄入新會計分錄
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          <div className="col-span-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">日期</label>
            <input type="date" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} className="w-full border-none bg-slate-100 rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none" />
          </div>
          <div className="col-span-2 relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">分錄摘要 (由 AI 協助分析)</label>
            <div className="relative">
              <input 
                value={newEntry.description}
                onChange={e => setNewEntry({...newEntry, description: e.target.value})}
                className="w-full bg-slate-100 border-none rounded-2xl p-4 pr-14 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none" 
                placeholder="例如：支付結構技師 25L-A01 期款 50萬" 
              />
              <button 
                onClick={handleAiAssist}
                disabled={isAiLoading || !newEntry.description}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:bg-white p-2 rounded-xl transition-all disabled:opacity-30"
              >
                {isAiLoading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">金額 (TWD)</label>
            <input type="number" value={newEntry.amount} onChange={e => setNewEntry({...newEntry, amount: Number(e.target.value)})} className="w-full bg-slate-100 border-none rounded-2xl p-4 text-sm font-black focus:ring-4 focus:ring-indigo-500/10 outline-none" />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
               <TrendingUp size={16}/> 借方科目
             </div>
             <input value={newEntry.debitAccount || ''} onChange={e => setNewEntry({...newEntry, debitAccount: e.target.value})} className="w-full border-none bg-slate-50 rounded-xl p-3 text-sm font-bold focus:ring-0 outline-none" placeholder="輸入科目..." />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest">
               <TrendingDown size={16}/> 貸方科目
             </div>
             <input value={newEntry.creditAccount || ''} onChange={e => setNewEntry({...newEntry, creditAccount: e.target.value})} className="w-full border-none bg-slate-50 rounded-xl p-3 text-sm font-bold focus:ring-0 outline-none" placeholder="輸入科目..." />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
               <AlertCircle size={16}/> 支出類別建議
             </div>
             <input value={newEntry.taxCategory || ''} className="w-full border-none bg-indigo-50 text-indigo-700 rounded-xl p-3 text-sm font-black focus:ring-0 outline-none" readOnly />
          </div>

          <div className="flex items-end">
            <button onClick={handleSave} className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
              <Save size={20} /> 儲存分錄紀錄
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-800">歷史分錄紀錄</h4>
          <span className="text-xs font-bold text-slate-400">當前顯示：最近 50 筆</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <th className="px-10 py-5">日期</th>
              <th className="px-10 py-5">分錄摘要</th>
              <th className="px-10 py-5">借方 (Debit)</th>
              <th className="px-10 py-5">貸方 (Credit)</th>
              <th className="px-10 py-5 text-right">金額</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {entries.length === 0 ? (
              <tr><td colSpan={5} className="px-10 py-20 text-center text-slate-300 font-bold italic">尚無今日分錄紀錄</td></tr>
            ) : (
              entries.map(e => (
                <tr key={e.id} className="hover:bg-indigo-50/10 transition-colors">
                  <td className="px-10 py-6 font-mono text-xs">{e.date}</td>
                  <td className="px-10 py-6 font-bold text-slate-700">{e.description}</td>
                  <td className="px-10 py-6"><span className="text-indigo-600 font-bold">{e.debitAccount}</span></td>
                  <td className="px-10 py-6"><span className="text-red-400 font-bold">{e.creditAccount}</span></td>
                  <td className="px-10 py-6 text-right font-mono font-black text-slate-900">${e.amount.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalEntries;
