
import React, { useState } from 'react';
import { Scale, FileText, Gavel, Sparkles, Plus, History, Loader2, Printer } from 'lucide-react';
// Fix: Removed Contract which was not exported from types.ts
import { User } from '../types';
import { GoogleGenAI } from "@google/genai";

const LegalModule: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');

  const handleGenerateClause = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: aiPrompt,
        config: {
          systemInstruction: '你是一位專業的台灣法律顧問，專精於建築法規與合約撰寫。請根據使用者的需求，撰寫專業、精確且符合台灣法律用語的合約條文。'
        }
      });
      setAiResult(response.text || '');
    } catch (e) {
      setAiResult('生成失敗，請稍後再試。');
    } finally {
      setAiLoading(false);
    }
  };

  const tabs = [
    { id: 'contracts', label: '合約管理', icon: FileText },
    { id: 'templates', label: '合約定型稿', icon: History },
    { id: 'advisor', label: '法律顧問', icon: Gavel },
    { id: 'ai', label: 'AI 條款助手', icon: Sparkles },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'ai':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-indigo-600" /> AI 法律條款撰寫助手
              </h3>
              <p className="text-slate-500 text-sm mb-6">輸入條款需求（如：追加預算條款），AI 將生成正式法律條文。</p>
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={4} 
                className="w-full border rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                placeholder="例如：撰寫一條關於建築設計變更追加費用的條款，需包含審核機制與付款期限..."
              />
              <button 
                onClick={handleGenerateClause}
                disabled={aiLoading}
                className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
              >
                {aiLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                立即生成法律條文
              </button>
            </div>
            {aiResult && (
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl animate-fade-in relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg"><Printer size={18}/></button>
                </div>
                <h4 className="font-bold border-b border-white/10 pb-4 mb-4 text-indigo-400">生成條文建議</h4>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{aiResult}</div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                <tr className="text-xs text-slate-500 font-bold uppercase">
                  <th className="px-6 py-4">合約編號</th>
                  <th className="px-6 py-4">業務類別</th>
                  <th className="px-6 py-4">狀態</th>
                  <th className="px-6 py-4">重要期限</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {[
                  { id: 'CTR-2501', category: '建築設計', status: '履約', deadline: '2025-12-31' },
                  { id: 'CTR-2412', category: '景觀設計', status: '結案', deadline: '2024-12-01' },
                ].map(c => (
                  <tr key={c.id}>
                    <td className="px-6 py-4 font-bold">{c.id}</td>
                    <td className="px-6 py-4">{c.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === '履約' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>{c.status}</span>
                    </td>
                    <td className="px-6 py-4 font-mono">{c.deadline}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 font-bold hover:underline">檢視內容</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-slate-200 px-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default LegalModule;
