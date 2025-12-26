
import React, { useState } from 'react';
import { Plus, Search, Filter, Pencil, Trash2, X } from 'lucide-react';
import { Project, User } from '../../types';

const natureOptions = ['A', 'C', 'U', 'E', 'S', 'D', 'P', 'L', 'B', 'O'];

const ProjectManagement: React.FC<{ user?: User }> = ({ user }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      code: '25L-A01',
      name: '大安景觀豪宅',
      client: '林先生',
      caseName: '大安區豪宅新建工程',
      location: '台北市大安區',
      product: 'H2集合住宅',
      status: '設計中',
      progress: 45,
      budget: 12000000,
      year: 2025,
      affiliation: '樂果',
      natures: ['A'],
      notes: ''
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    year: new Date().getFullYear(),
    affiliation: '如果',
    natures: [],
    progress: 0
  });

  const generateProjectCode = (year: number, aff: string, selectedNatures: string[], seq: number) => {
    const yr = year.toString().slice(-2);
    let affCode = aff === '樂果' ? 'L-' : aff === '成果' ? 'C-' : '-';
    const nCode = [...selectedNatures].sort().join('');
    return `${yr}${affCode}${nCode}${seq.toString().padStart(2, '0')}`;
  };

  const toggleNature = (n: string) => {
    const current = newProject.natures || [];
    const updated = current.includes(n) ? current.filter(x => x !== n) : [...current, n];
    setNewProject({...newProject, natures: updated});
  };

  const handleAdd = () => {
    const code = generateProjectCode(newProject.year!, newProject.affiliation!, newProject.natures!, projects.length + 1);
    setProjects([...projects, { ...(newProject as Project), id: Math.random().toString(), code }]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none" placeholder="搜尋專案..." />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 font-bold shadow-sm transition-all active:scale-95"
        >
          <Plus size={18} /> 新增專案
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200 tracking-widest">
            <tr>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">專案編號 ▲</th>
              <th className="px-6 py-4">專案名稱</th>
              <th className="px-6 py-4">產品 / 位置</th>
              <th className="px-6 py-4">狀態進度</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-indigo-600 whitespace-nowrap">{p.code}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{p.name}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{p.client}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">{p.product}</div>
                  <div className="text-xs text-slate-400">{p.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{p.status}</span>
                    <span className="text-[10px] font-bold text-slate-400">{p.progress}%</span>
                  </div>
                  <div className="w-32 h-1 bg-slate-100 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{width: `${p.progress}%`}} />
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Pencil size={16}/></button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-scale-up">
            <h3 className="text-2xl font-bold mb-8">建立新案件</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">專案名稱</label>
                <input 
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="例如：大安區景觀豪宅" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">案件歸屬</label>
                <select 
                  onChange={e => setNewProject({...newProject, affiliation: e.target.value as any})}
                  className="w-full border rounded-xl p-3 outline-none"
                >
                  <option>如果</option>
                  <option>樂果</option>
                  <option>成果</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">案件性質</label>
                <div className="flex flex-wrap gap-1 p-2 border rounded-xl min-h-[46px]">
                  {newProject.natures?.map(n => (
                    <span key={n} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      {n} <button onClick={() => toggleNature(n)}><X size={12}/></button>
                    </span>
                  ))}
                  <button className="px-2 text-indigo-400 hover:text-indigo-600"><Plus size={16}/></button>
                </div>
                <div className="mt-2 flex gap-1 flex-wrap">
                  {natureOptions.filter(n => !newProject.natures?.includes(n)).map(n => (
                    <button key={n} onClick={() => toggleNature(n)} className="text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border hover:bg-indigo-50 hover:text-indigo-600 transition-colors">{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 border rounded-2xl font-bold text-slate-500">取消</button>
              <button onClick={handleAdd} className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">確認建檔</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
