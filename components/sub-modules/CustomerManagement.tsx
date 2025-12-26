
import React, { useState } from 'react';
import { UserPlus, Download, FileUp, Search, Plus, Trash2, Pencil, MoreVertical, Filter, ChevronRight } from 'lucide-react';
import { Customer, Contact, User } from '../../types';

const CustomerManagement: React.FC<{ user: User }> = ({ user }) => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      code: 'CUST-0001',
      category: '業主',
      companyName: '大安建設股份有限公司',
      taxId: '12345678',
      address: '台北市大安區信義路四段1號',
      contacts: [{ name: '林經理', title: '工務部經理', phone: '0912-345678', email: 'lin@daan.com' }],
      paymentTerms: '簽約 30%, 開工 30%, 完工 40%'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCust, setEditingCust] = useState<Customer | null>(null);
  const [newCust, setNewCust] = useState<Partial<Customer>>({
    contacts: [{ name: '', title: '', phone: '', email: '' }]
  });

  const handleAddContact = () => {
    setNewCust({
      ...newCust,
      contacts: [...(newCust.contacts || []), { name: '', title: '', phone: '', email: '' }]
    });
  };

  const handleSave = () => {
    if (editingCust) {
      setCustomers(prev => prev.map(c => c.id === editingCust.id ? { ...editingCust } : c));
      setEditingCust(null);
    } else {
      const cust: Customer = {
        ...(newCust as Customer),
        id: Math.random().toString(),
        code: `CUST-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`
      };
      setCustomers([...customers, cust]);
    }
    setIsModalOpen(false);
  };

  const handleGenerateReport = () => {
    alert("正在生成客戶報表摘要...\n\n包含：專案匯總、合約總額統計與當前履約狀態。");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {user.role !== '設計師' && (
            <button onClick={() => { setEditingCust(null); setIsModalOpen(true); }} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95">
              <UserPlus size={18} /> 新增客戶
            </button>
          )}
          <button onClick={handleGenerateReport} className="flex items-center gap-2 px-6 py-2.5 border rounded-xl font-bold hover:bg-slate-50 transition-colors">
            <Download size={18} /> 生成客戶報表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">
            <Filter size={18} /> 篩選
          </button>
        </div>
        <div className="relative w-full lg:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" placeholder="搜尋客戶名稱、統編..." />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">客戶資訊</th>
              <th className="px-8 py-5">聯絡人</th>
              <th className="px-8 py-5">付款條件</th>
              <th className="px-8 py-5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                      {c.companyName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{c.category}</span>
                        <span className="font-mono text-[10px] text-slate-400">{c.code}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 mt-0.5 group-hover:text-indigo-600 transition-colors">{c.companyName}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">統編: {c.taxId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-slate-700">{c.contacts[0]?.name}</div>
                  <div className="text-xs text-slate-400">{c.contacts[0]?.phone}</div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-xs text-slate-500 max-w-xs truncate font-medium">{c.paymentTerms}</p>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-1">
                    <button 
                      onClick={() => { setEditingCust(c); setIsModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="py-20 text-center text-slate-300 font-bold italic">
            尚未建立客戶資料庫
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white w-full max-w-2xl rounded-[40px] p-10 mx-4 shadow-2xl animate-scale-up">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <UserPlus className="text-indigo-600" /> {editingCust ? '編輯客戶資料' : '新增客戶資料'}
            </h3>
            <div className="grid grid-cols-2 gap-6 h-[60vh] overflow-y-auto px-2">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">客戶類別</label>
                <select 
                  value={editingCust ? editingCust.category : newCust.category}
                  onChange={e => editingCust ? setEditingCust({...editingCust, category: e.target.value}) : setNewCust({...newCust, category: e.target.value})} 
                  className="w-full border rounded-2xl p-3 outline-none focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option>業主</option>
                  <option>公安業主</option>
                  <option>機關</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">統一編號</label>
                <input 
                  value={editingCust ? editingCust.taxId : newCust.taxId}
                  onChange={e => editingCust ? setEditingCust({...editingCust, taxId: e.target.value}) : setNewCust({...newCust, taxId: e.target.value})} 
                  className="w-full border rounded-2xl p-3 outline-none" 
                  placeholder="8碼統編"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">公司名稱</label>
                <input 
                  value={editingCust ? editingCust.companyName : newCust.companyName}
                  onChange={e => editingCust ? setEditingCust({...editingCust, companyName: e.target.value}) : setNewCust({...newCust, companyName: e.target.value})} 
                  className="w-full border rounded-2xl p-3 outline-none" 
                  placeholder="全名"
                />
              </div>
              
              <div className="col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase">聯絡人資訊</label>
                  <button onClick={handleAddContact} className="text-xs bg-slate-100 px-3 py-1.5 rounded-xl font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                    + 增加聯絡人
                  </button>
                </div>
                {(editingCust ? editingCust.contacts : (newCust.contacts || [])).map((contact, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-3 mb-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <input className="border p-2 rounded-xl text-sm" placeholder="姓名" defaultValue={contact.name} />
                    <input className="border p-2 rounded-xl text-sm" placeholder="職稱" defaultValue={contact.title} />
                    <input className="border p-2 rounded-xl text-sm" placeholder="電話" defaultValue={contact.phone} />
                    <button className="text-red-400 hover:text-red-600 flex items-center justify-center"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">付款與放款規定</label>
                <textarea 
                  value={editingCust ? editingCust.paymentTerms : newCust.paymentTerms}
                  onChange={e => editingCust ? setEditingCust({...editingCust, paymentTerms: e.target.value}) : setNewCust({...newCust, paymentTerms: e.target.value})}
                  rows={4} className="w-full border rounded-2xl p-4 text-sm outline-none" placeholder="請詳述付款規定..." 
                />
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-3">
              <button onClick={() => { setIsModalOpen(false); setEditingCust(null); }} className="px-8 py-3 border rounded-2xl font-bold text-slate-500">取消</button>
              <button onClick={handleSave} className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all">確認儲存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
