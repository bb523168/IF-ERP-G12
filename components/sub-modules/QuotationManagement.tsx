
import React, { useState } from 'react';
import { FileText, Printer, CheckCircle, Plus, Eye, Trash2, ChevronRight, Save } from 'lucide-react';
// Fix: Removed PaymentPhase which was not exported from types.ts
import { Quotation, User } from '../../types';

const INITIAL_QUOTES: Quotation[] = [
  { id: 'Q25001', date: '2025-05-15', product: '大安豪宅景觀設計', isApproved: true, totalAmount: 1200000 },
  { id: 'Q25002', date: '2025-05-18', product: '南港商辦公安申報', isApproved: false, totalAmount: 85000 },
];

const QuotationManagement: React.FC<{ user: User }> = ({ user }) => {
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTES);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("確定要刪除此報價單嗎？")) {
      setQuotations(prev => prev.filter(q => q.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">報價單管理中心</h2>
          <p className="text-slate-500 text-sm mt-1">追蹤所有發出的服務建議與報價金額</p>
        </div>
        {user.role !== '設計師' && (
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">
            <Plus size={20} /> 建立報價單
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">開立日期</th>
              <th className="px-8 py-5">報價編號 / 專案名稱</th>
              <th className="px-8 py-5 text-right">報價總額</th>
              <th className="px-8 py-5">狀態</th>
              <th className="px-8 py-5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {quotations.map(q => (
              <tr key={q.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-6 text-sm font-mono text-slate-500">{q.date}</td>
                <td className="px-8 py-6">
                  <div className="font-mono text-[10px] text-indigo-500 font-bold">{q.id}</div>
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{q.product}</div>
                </td>
                <td className="px-8 py-6 text-right font-bold text-slate-700 font-mono">
                  ${q.totalAmount?.toLocaleString()}
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    q.isApproved ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {q.isApproved ? '已核准' : '審核中'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setSelectedQuote(q); setIsPreviewOpen(true); }}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl"
                    >
                      <Eye size={18}/>
                    </button>
                    <button 
                      onClick={() => handleDelete(q.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {quotations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold italic">暫無報價歷史資料</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 報價單列印預覽區域 */}
      <div className="mt-12 bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <FileText className="text-indigo-400" /> 報價單列印與預覽
            </h3>
            <p className="text-slate-400 text-sm mt-1">選取上方報價單進行格式化預覽與輸出 PDF</p>
          </div>
          <div className="flex gap-3">
             <button onClick={handlePrint} className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-bold flex items-center gap-2 transition-all hover:bg-slate-100 active:scale-95">
              <Printer size={18} /> 列印輸出 (PDF)
            </button>
            <button className="px-6 py-3 bg-slate-800 text-white border border-slate-700 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-700">
              <Save size={18} /> 儲存為草稿
            </button>
          </div>
        </div>
        
        <div className="bg-white text-slate-800 p-12 rounded-3xl min-h-[600px] shadow-2xl font-serif relative print:p-0 print:shadow-none">
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-10">
            <h1 className="text-4xl font-black tracking-[0.3em] text-slate-900 mb-2">如 果 建 築 師 事 務 所</h1>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-sans">If Architect Firm - Professional ERP System Output</p>
            <p className="text-sm mt-3 font-sans">地址：台中市西屯區大墩二十街116號4樓之2 | 電話：04-2310-xxxx</p>
          </div>
          
          <div className="grid grid-cols-2 gap-12 mb-10 font-sans">
            <div>
              <p className="font-bold border-b border-slate-200 pb-2 mb-3 text-slate-400 text-xs uppercase tracking-wider">客戶資訊 Client Details</p>
              <h4 className="font-bold text-xl mb-1">{selectedQuote?.product ? "選定專案報價內容" : "[未選擇專案]"}</h4>
              <p className="text-sm">客戶名稱：{selectedQuote?.product ? "點選帶入之業主名稱" : "-"}</p>
              <p className="text-sm">統一編號：{selectedQuote?.id ? "自動帶入之統編" : "-"}</p>
              <p className="text-sm">日期：{selectedQuote?.date || "2025-XX-XX"}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="font-bold border-b border-slate-200 pb-2 mb-3 text-slate-400 text-xs uppercase tracking-wider">匯款帳戶 Remittance Info</p>
              <p className="text-sm font-medium">銀行：(812) 台新銀行 大里分行</p>
              <p className="text-sm font-bold text-indigo-600 mt-1 tracking-wider">帳號：2018-01-00007936</p>
              <p className="text-[10px] text-slate-400 mt-2 italic">※ 匯款後請提供後五碼以利會計對帳</p>
            </div>
          </div>

          <div className="mb-10 font-sans">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left rounded-tl-xl font-bold">服務項目說明 Description</th>
                  <th className="p-4 text-center font-bold">比例 (%)</th>
                  <th className="p-4 text-right rounded-tr-xl font-bold">小計 Amount (TWD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border border-slate-200 rounded-b-xl overflow-hidden">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold">建築設計服務費 (基本)</td>
                  <td className="p-4 text-center">100%</td>
                  <td className="p-4 text-right font-mono font-bold">${selectedQuote?.totalAmount?.toLocaleString() || "0"}</td>
                </tr>
                <tr className="bg-indigo-50/20">
                  <td colSpan={2} className="p-4 text-right font-bold uppercase tracking-wider">總計 Total Amount</td>
                  <td className="p-4 text-right font-mono font-black text-xl text-indigo-700">${selectedQuote?.totalAmount?.toLocaleString() || "0"}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 text-xs text-slate-400 font-bold px-4">
              總計大寫：{selectedQuote?.totalAmount ? "壹佰貳拾萬圓整" : "零圓整"}
            </div>
          </div>

          <div className="mt-20 flex justify-end font-sans">
            <div className="w-64 h-32 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-300 relative group transition-all">
              <span className="text-xs uppercase font-bold tracking-[0.2em]">建築師執業職章處</span>
              <div className="absolute inset-0 flex items-center justify-center rotate-[-15deg]">
                <div className={`border-4 border-red-500/30 text-red-500/30 font-black p-4 text-3xl rounded-full uppercase tracking-tighter ${selectedQuote?.isApproved ? 'opacity-100 scale-110' : 'opacity-0'} transition-all duration-700`}>
                  Confirmed
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 text-[10px] text-slate-300 text-center uppercase tracking-[0.3em]">
            IF Architect ERP System Output • Page 1 of 1
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationManagement;
