
import React from 'react';
import { UserPlus, Mail, Phone, MapPin, Search } from 'lucide-react';
import { Employee } from '../types';

// Add hireDate to mock data to fix type errors
const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: '王大明', position: '主持建築師', department: '管理層', status: '在職', hireDate: '2010-01-01' },
  { id: '2', name: '李小美', position: '資深專案經理', department: '專案一部', status: '在職', hireDate: '2015-05-12' },
  { id: '3', name: '張三', position: '設計師', department: '專案二部', status: '請假', hireDate: '2020-03-20' },
  { id: '4', name: '趙四', position: '法務專員', department: '行政室', status: '在職', hireDate: '2022-11-01' },
  { id: '5', name: '陳工程', position: '結構技師', department: '工務組', status: '在職', hireDate: '2021-08-15' },
];

const HR: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">員工名錄</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
          <UserPlus size={18} />
          新增員工
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_EMPLOYEES.map((emp) => (
          <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${
              emp.status === '在職' ? 'bg-green-500' : 'bg-amber-500'
            }`}></div>
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  {emp.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">{emp.name}</h4>
                  <p className="text-sm text-indigo-600 font-medium">{emp.position}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                emp.status === '在職' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {emp.status}
              </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Mail size={16} className="text-slate-400" />
                <span>{emp.id === '1' ? 'admin' : 'staff' + emp.id}@if-arch.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Phone size={16} className="text-slate-400" />
                <span>02-2345-678{emp.id}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MapPin size={16} className="text-slate-400" />
                <span>台北總部 / {emp.department}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                查看檔案
              </button>
              <button className="px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HR;
