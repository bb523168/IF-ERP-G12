
import React, { useState } from 'react';
import { Mic2, FileText, Sparkles, Plus, Search, Calendar } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MeetingMinutes: React.FC = () => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [minutes, setMinutes] = useState([
    { id: '1', project: '大安豪宅', date: '2024-05-15', title: '初稿設計確認會議' }
  ]);

  const handleAiGeneration = async () => {
    setIsAiLoading(true);
    // 這裡模擬呼叫 Gemini 將語音轉文字或草稿整理為正式會議記錄
    setTimeout(() => {
      alert("AI 已完成會議記錄摘要：\n1. 確認外牆材質選用石材\n2. 二樓窗台高度調整至 90cm\n3. 下次會議時間：2024-05-22");
      setIsAiLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white flex justify-between items-center shadow-lg">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles size={24} /> AI 會議記錄助手
          </h2>
          <p className="text-white/80 mt-2">上傳錄音檔或輸入草稿，我將為您自動生成結構化的會議摘要與待辦事項。</p>
        </div>
        <button 
          onClick={handleAiGeneration}
          disabled={isAiLoading}
          className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2"
        >
          {isAiLoading ? "處理中..." : "開始 AI 生成"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">專案列表</h3>
          <div className="space-y-2">
            {['大安豪宅案', '南港商辦', '台中集合住宅'].map(p => (
              <button key={p} className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-600">
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">會議歷史紀錄</h3>
            <button className="flex items-center gap-1 text-indigo-600 font-bold text-sm">
              <Plus size={16}/> 新增紀錄
            </button>
          </div>
          
          {minutes.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{m.title}</h4>
                  <p className="text-xs text-slate-400">{m.project} • {m.date}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-indigo-600"><FileText size={20}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingMinutes;
