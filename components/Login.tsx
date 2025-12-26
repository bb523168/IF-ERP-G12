
import React, { useState } from 'react';
import { User as UserIcon, Lock, Building2, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (user: { id: string; name: string; role: UserRole }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('設計師');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 依照使用者需求：帳號 1, 密碼 1, 權限 建築師
    if (username === '1' && password === '1') {
      onLogin({ id: '1', name: '建築師', role: '建築師' });
      return;
    }

    // 其他權限的簡易測試邏輯
    if (username === 'manager' && password === '123') {
      onLogin({ id: 'mgr', name: '經理人', role: '經理' });
    } else if (username === 'designer' && password === '123') {
      onLogin({ id: 'dsgn', name: '設計師', role: '設計師' });
    } else {
      // 如果不是預設帳號，則根據 UI 選項登入 (方便測試)
      onLogin({ id: 'test', name: '測試使用者', role });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl transition-all">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-500/30">IF</div>
          <h1 className="text-2xl font-bold text-slate-800">如果建築師事務所</h1>
          <p className="text-slate-500 mt-2 font-medium">ERP 整合管理系統</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 font-medium">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">帳號</label>
            <div className="relative">
              <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder="請輸入帳號"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">密碼</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder="請輸入密碼"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-bold text-slate-700 mb-3">預設權限群組 (若非預設帳號)</label>
            <div className="grid grid-cols-3 gap-2">
              {(['建築師', '經理', '設計師'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2.5 px-1 rounded-xl text-xs font-bold border transition-all ${
                    role === r 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] mt-4"
          >
            登入系統
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">測試帳號：<span className="font-bold text-slate-600">1</span> / 密碼：<span className="font-bold text-slate-600">1</span></p>
        </div>

        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-semibold opacity-50">
          Confidential System - If Architect Firm Only
        </p>
      </div>
    </div>
  );
};

export default Login;
