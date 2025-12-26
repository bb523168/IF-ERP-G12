
import React, { useState, useRef } from 'react';
import { PenTool, Stamp, CreditCard, Layers, Plus, Trash2 } from 'lucide-react';

const LendingManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [records, setRecords] = useState([
    { id: '1', date: '2025-05-20', borrower: '張工程師', item: '原子章A (合併)', type: '印章' },
    { id: '2', date: '2025-05-19', borrower: '李專員', item: '自然人憑證', type: '卡片' },
  ]);

  const handleClear = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }
  };

  const handleStartSign = (e: any) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    const rect = canvasRef.current!.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleSigning = (e: any) => {
    if (e.buttons !== 1) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: '書圖流水帳', icon: Layers, count: 12, color: 'text-blue-600' },
          { label: '印章借出 (正/副/原子)', icon: Stamp, count: 3, color: 'text-amber-600' },
          { label: '卡片憑證 (組織/自然人)', icon: CreditCard, count: 1, color: 'text-indigo-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.count} <span className="text-sm">筆進行中</span></p>
            </div>
            <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}><stat.icon size={24}/></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-slate-800">最新借出紀錄</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Plus size={18} /> 新增借出
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500">
            <tr>
              <th className="px-6 py-4">日期</th>
              <th className="px-6 py-4">借用人</th>
              <th className="px-6 py-4">類別</th>
              <th className="px-6 py-4">借用項目</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {records.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono">{r.date}</td>
                <td className="px-6 py-4 font-bold">{r.borrower}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">{r.type}</span>
                </td>
                <td className="px-6 py-4">{r.item}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6">新增借出紀錄</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="col-span-1">
                <label className="block text-xs font-bold mb-1">借用人</label>
                <input className="w-full border rounded-lg p-2" placeholder="姓名" />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold mb-1">電話</label>
                <input className="w-full border rounded-lg p-2" placeholder="09xx-xxxxxx" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold mb-1">借用項目 (如: 原子章A)</label>
                <input className="w-full border rounded-lg p-2" />
              </div>
            </div>
            
            <label className="block text-xs font-bold mb-1">借用人簽名 (請在下方繪製)</label>
            <div className="border-2 border-slate-100 rounded-xl overflow-hidden bg-slate-50 relative">
              <canvas 
                ref={canvasRef}
                width={500}
                height={150}
                onMouseDown={handleStartSign}
                onMouseMove={handleSigning}
                className="w-full cursor-crosshair"
              />
              <button 
                onClick={handleClear}
                className="absolute bottom-2 right-2 text-[10px] bg-white border px-2 py-1 rounded-md"
              >清除簽名</button>
            </div>

            <div className="mt-8 flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border rounded-xl font-bold">取消</button>
              <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">確認借出</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LendingManagement;
