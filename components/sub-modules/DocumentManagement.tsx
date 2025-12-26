
import React, { useState } from 'react';
import { Layers, Sparkles, Languages, Loader2, Download, FileText, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const DocumentManagement: React.FC = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [targetLang, setTargetLang] = useState('英文');
  const [translatedResult, setTranslatedResult] = useState('');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `請將以下建築相關專業文件內容翻譯成${targetLang}，確保專有名詞準確且口吻正式：\n\n${sourceText}`,
      });
      setTranslatedResult(response.text || '');
    } catch (e) {
      setTranslatedResult('翻譯發生錯誤，請稍後再試。');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Layers size={20} className="text-indigo-600" /> 文件翻譯與摘要 (AI 助手)
            </h3>
            <select 
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="bg-slate-50 border rounded-xl px-4 py-2 text-sm font-bold outline-none"
            >
              <option>英文</option>
              <option>日文</option>
              <option>韓文</option>
              <option>繁體中文 (轉換用語)</option>
            </select>
          </div>
          <textarea 
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="w-full h-48 border rounded-2xl p-4 text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none"
            placeholder="請輸入或貼上需要翻譯的文件內容..."
          />
          <button 
            onClick={handleTranslate}
            disabled={isTranslating}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg active:scale-95"
          >
            {isTranslating ? <Loader2 className="animate-spin" /> : <Languages size={20} />}
            開始 AI 專業翻譯
          </button>
        </div>
        
        {translatedResult && (
          <div className="flex-1 space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold flex items-center gap-2 text-green-600">
              <Sparkles size={20} /> 翻譯結果
            </h3>
            <div className="w-full h-48 bg-slate-900 text-slate-100 border rounded-2xl p-4 text-sm overflow-y-auto leading-relaxed whitespace-pre-wrap font-mono">
              {translatedResult}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 border rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50">
                <Download size={18} /> 儲存為 DOCX
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b flex justify-between items-center">
          <h4 className="font-bold">專案文件庫</h4>
          <button className="text-indigo-600 text-sm font-bold underline">上傳新文件</button>
        </div>
        <div className="p-4 space-y-2">
          {[
            { name: '25L-A01_設計規範說明書.pdf', size: '1.2 MB', date: '2025-05-10' },
            { name: '24C-S15_地質調查報告.pdf', size: '4.5 MB', date: '2025-05-12' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl"><FileText size={20}/></div>
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{doc.name}</div>
                  <div className="text-xs text-slate-400">{doc.size} • 上傳於 {doc.date}</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;
