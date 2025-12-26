
import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Pencil, Trash2, X, Calendar, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { Project, User } from '../../types';

// 案件性質定義與固定排序
const NATURE_MAP: Record<string, string> = {
  'A': '建築設計',
  'C': '變更設計',
  'U': '變更使用',
  'E': '室內裝修',
  'S': '公安檢查申報',
  'D': '拆除執照',
  'P': '公共工程',
  'L': '建築線',
  'B': '基地調整',
  'O': '其他'
};

const NATURE_ORDER = ['A', 'C', 'U', 'E', 'S', 'D', 'P', 'L', 'B', 'O'];

// 狀態選項
const STATUS_OPTIONS = [
  '預備報價', '報價審查', '流案', '簽約', '規劃中', '建照前期', 
  '建照審查', '施工中', '結構體完成', '請使照', '結案'
];

// 案件歸屬代碼
const AFFILIATION_CODE: Record<string, string> = {
  '如果': '-',
  '樂果': 'L-',
  '成果': 'C-'
};

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
      status: '規劃中',
      progress: 45,
      budget: 12000000,
      year: 2025,
      affiliation: '樂果',
      natures: ['A'],
      notes: ''
    },
    {
      id: '2',
      code: '24C-AS01',
      name: '南港廠房更新',
      client: '國建開發',
      caseName: '南港廠房耐震補強',
      location: '台北市南港區',
      product: 'C1工業建築',
      status: '施工中',
      progress: 75,
      budget: 8500000,
      year: 2024,
      affiliation: '成果',
      natures: ['A', 'S'],
      notes: ''
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedNatureFilter, setSelectedNatureFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    client: '',
    year: new Date().getFullYear(),
    affiliation: '如果',
    natures: [],
    status: '規劃中',
    progress: 0,
    budget: 0
  });

  // 計算特定年度的統計數據
  const yearProjects = useMemo(() => {
    return projects.filter(p => p.year === selectedYear);
  }, [projects, selectedYear]);

  const natureStats = useMemo(() => {
    const stats: Record<string, number> = {};
    NATURE_ORDER.forEach(n => stats[n] = 0);
    yearProjects.forEach(p => {
      // 防禦性處理：確保 natures 存在
      const natures = p.natures || [];
      natures.forEach(n => {
        if (stats[n] !== undefined) stats[n]++;
      });
    });
    return stats;
  }, [yearProjects]);

  // 過濾後的列表
  const filteredProjects = useMemo(() => {
    return yearProjects.filter(p => {
      // 防禦性處理：防止 undefined 導致 includes 崩潰
      const natures = p.natures || [];
      const name = p.name || '';
      const code = p.code || '';
      const client = p.client || '';
      const query = (searchQuery || '').toLowerCase();

      const matchesNature = selectedNatureFilter ? natures.includes(selectedNatureFilter) : true;
      const matchesSearch = name.toLowerCase().includes(query) || 
                            code.toLowerCase().includes(query) || 
                            client.toLowerCase().includes(query);
      return matchesNature && matchesSearch;
    });
  }, [yearProjects, selectedNatureFilter, searchQuery]);

  const generateProjectCode = (year: number, aff: string, selectedNatures: string[]) => {
    const yr = year.toString().slice(-2);
    const affCode = AFFILIATION_CODE[aff] || '-';
    // 依固定順序排列字母
    const sortedNatures = [...(selectedNatures || [])]
      .sort((a, b) => NATURE_ORDER.indexOf(a) - NATURE_ORDER.indexOf(b))
      .join('');
    
    // 找尋該年度該歸屬的最大編號
    const seq = projects.filter(p => p.year === year).length + 1;
    return `${yr}${affCode}${sortedNatures}${seq.toString().padStart(2, '0')}`;
  };

  const toggleNature = (n: string, isEdit: boolean) => {
    const target = isEdit ? editingProject : newProject;
    const setter = isEdit ? setEditingProject : setNewProject;
    if (!target) return;

    const current = target.natures || [];
    const updated = current.includes(n) ? current.filter(x => x !== n) : [...current, n];
    setter({ ...target, natures: updated } as any);
  };

  const handleSave = () => {
    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...editingProject } as Project : p));
      setEditingProject(null);
    } else {
      const code = generateProjectCode(newProject.year!, newProject.affiliation!, newProject.natures! || []);
      setProjects([...projects, { 
        name: '', client: '', natures: [], status: '規劃中', progress: 0, budget: 0, notes: '', caseName: '', location: '', product: '', // 預設值
        ...(newProject as Project), 
        id: Math.random().toString(), 
        code 
      }]);
      setNewProject({
        name: '',
        client: '',
        year: new Date().getFullYear(),
        affiliation: '如果',
        natures: [],
        status: '規劃中',
        progress: 0,
        budget: 0
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 年度選擇與搜尋 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
            <Calendar size={18} className="text-slate-500" />
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
            >
              {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y} 年度</option>)}
            </select>
          </div>
          <div className="relative w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" 
              placeholder="搜尋編碼、名稱..." 
            />
          </div>
        </div>
        <button 
          onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          <Plus size={18} /> 新增專案建檔
        </button>
      </div>

      {/* 互動式統計卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        <button 
          onClick={() => setSelectedNatureFilter(null)}
          className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 ${
            selectedNatureFilter === null 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
              : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
          }`}
        >
          <LayoutGrid size={20} className={selectedNatureFilter === null ? 'text-white' : 'text-slate-400'} />
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-70">全部案件</div>
            <div className="text-xl font-black font-mono">{yearProjects.length}</div>
          </div>
        </button>
        {NATURE_ORDER.map(n => (
          <button 
            key={n}
            onClick={() => setSelectedNatureFilter(n)}
            className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 ${
              selectedNatureFilter === n 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
            }`}
          >
            <span className="font-bold text-lg">{n}</span>
            <div>
              <div className="text-[10px] font-bold truncate opacity-70">{NATURE_MAP[n]}</div>
              <div className="text-xl font-black font-mono">{natureStats[n]}</div>
            </div>
          </button>
        ))}
      </div>

      {/* 列表標題 */}
      <div className="flex items-center gap-3 px-2">
        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
        <h3 className="text-xl font-black text-slate-800">
          {selectedYear} 年度 - {selectedNatureFilter ? NATURE_MAP[selectedNatureFilter] : '全部'}案件列表
        </h3>
      </div>

      {/* 專案列表表格 */}
      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200 tracking-widest">
            <tr>
              <th className="px-8 py-5">專案編號 / 歸屬</th>
              <th className="px-8 py-5">專案名稱 / 業主</th>
              <th className="px-8 py-5">案件性質</th>
              <th className="px-8 py-5">狀態 / 進度</th>
              <th className="px-8 py-5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProjects.map(p => (
              <tr key={p.id} className="hover:bg-indigo-50/20 transition-colors group">
                <td className="px-8 py-6">
                  <div className="font-mono font-black text-indigo-600 text-sm">{p.code}</div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{p.affiliation}事務所</div>
                </td>
                <td className="px-8 py-6">
                  <div className="font-bold text-slate-800 text-base">{p.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">{p.client}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-wrap gap-1">
                    {(p.natures || []).map(n => (
                      <span key={n} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded uppercase">
                        {n}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black text-white bg-slate-800 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {p.status}
                    </span>
                    <span className="text-[11px] font-black text-slate-400 font-mono">{p.progress}%</span>
                  </div>
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-700" style={{width: `${p.progress}%`}} />
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingProject(p); setIsModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-indigo-100 transition-all"
                    >
                      <Pencil size={18}/>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-red-100 transition-all">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center text-slate-300">
                    <LayoutGrid size={48} className="mb-4 opacity-20" />
                    <p className="font-bold italic">尚無符合條件的案件資料</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 新增/編輯彈窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] p-10 shadow-2xl animate-scale-up overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black text-slate-800">
                {editingProject ? '編輯專案資料' : '建立新專案建檔'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">專案名稱 (顯示於系統)</label>
                <input 
                  value={editingProject ? (editingProject.name || '') : (newProject.name || '')}
                  onChange={e => {
                    const val = e.target.value;
                    editingProject ? setEditingProject({...editingProject, name: val}) : setNewProject({...newProject, name: val});
                  }}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                  placeholder="例如：大安區景觀豪宅案" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">案件年分</label>
                <select 
                  value={editingProject ? editingProject.year : newProject.year}
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    editingProject ? setEditingProject({...editingProject, year: val}) : setNewProject({...newProject, year: val});
                  }}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                >
                  {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y} 年度</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">案件歸屬</label>
                <div className="grid grid-cols-3 gap-2">
                  {['如果', '樂果', '成果'].map(aff => (
                    <button
                      key={aff}
                      onClick={() => {
                        editingProject ? setEditingProject({...editingProject, affiliation: aff as any}) : setNewProject({...newProject, affiliation: aff as any});
                      }}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        (editingProject ? editingProject.affiliation : newProject.affiliation) === aff
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200'
                      }`}
                    >
                      {aff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">案件性質 (可複選)</label>
                <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  {NATURE_ORDER.map(n => {
                    const isSelected = (editingProject ? editingProject.natures : newProject.natures)?.includes(n);
                    return (
                      <button
                        key={n}
                        onClick={() => toggleNature(n, !!editingProject)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {n} {NATURE_MAP[n]}
                        {isSelected && <CheckCircle2 size={12} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">當前狀態</label>
                <select 
                  value={editingProject ? editingProject.status : newProject.status}
                  onChange={e => {
                    const val = e.target.value;
                    editingProject ? setEditingProject({...editingProject, status: val}) : setNewProject({...newProject, status: val});
                  }}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                >
                  {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">預估進度 (%)</label>
                <input 
                  type="number"
                  value={editingProject ? editingProject.progress : newProject.progress}
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    editingProject ? setEditingProject({...editingProject, progress: val}) : setNewProject({...newProject, progress: val});
                  }}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                  max="100" min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">業主名稱 / 公司名稱</label>
                <input 
                  value={editingProject ? (editingProject.client || '') : (newProject.client || '')}
                  onChange={e => {
                    const val = e.target.value;
                    editingProject ? setEditingProject({...editingProject, client: val}) : setNewProject({...newProject, client: val});
                  }}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                  placeholder="全名" 
                />
              </div>
            </div>

            <div className="mt-12 flex justify-end gap-4">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-8 py-4 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleSave}
                className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 active:scale-95 transition-all hover:bg-indigo-700"
              >
                {editingProject ? '確認更新' : '確認建檔'}
              </button>
            </div>
            
            {!editingProject && (
              <div className="mt-6 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  系統將根據設定自動生成編碼
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
