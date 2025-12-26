
import React from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
  { name: '1月', 營收: 4000, 支出: 2400 },
  { name: '2月', 營收: 3000, 支出: 1398 },
  { name: '3月', 營收: 2000, 支出: 9800 },
  { name: '4月', 營收: 2780, 支出: 3908 },
  { name: '5月', 營收: 1890, 支出: 4800 },
  { name: '6月', 營收: 2390, 支出: 3800 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '進行中專案', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2', trendType: 'up' },
          { label: '本月營收', value: '$2,450,000', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', trend: '12%', trendType: 'up' },
          { label: '待簽核事項', value: '5', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-1', trendType: 'down' },
          { label: '事務所人數', value: '28', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', trend: '穩定', trendType: 'neutral' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.trendType === 'up' ? 'text-green-600' : stat.trendType === 'down' ? 'text-red-600' : 'text-slate-400'
              }`}>
                {stat.trendType === 'up' ? <ArrowUpRight size={14} /> : stat.trendType === 'down' ? <ArrowDownRight size={14} /> : null}
                {stat.trend}
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">營收趨勢分析</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>最近六個月</option>
              <option>最近一年</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="營收" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="支出" stroke="#94a3b8" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Recent Approvals */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">最近簽核</h3>
          <div className="space-y-4">
            {[
              { title: '臺北市住宅設計案-追加預算', time: '2小時前', status: 'pending', user: '陳工程師' },
              { title: '辦公室耗材採購', time: '5小時前', status: 'approved', user: '王行政' },
              { title: '員工特休申請 (李小美)', time: '昨天', status: 'approved', user: '李小美' },
              { title: '林公館合約修訂案', time: '昨天', status: 'rejected', user: '張法務' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  item.status === 'pending' ? 'bg-amber-500' : 
                  item.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600">{item.title}</div>
                  <div className="text-xs text-slate-500 flex justify-between mt-1">
                    <span>{item.user}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300 self-center" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            查看所有簽核事項
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
