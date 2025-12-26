
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  PROJECTS = 'PROJECTS',
  FINANCE = 'FINANCE',
  LEGAL = 'LEGAL',
  HR = 'HR',
  ADMIN = 'ADMIN',
  APPROVAL = 'APPROVAL',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS'
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: '設計中' | '執照申請' | '施工中' | '已結案';
  progress: number;
  budget: number;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: '在職' | '請假' | '離職';
}

export interface FinanceRecord {
  id: string;
  type: '收入' | '支出';
  category: string;
  amount: number;
  date: string;
  note: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  requester: string;
  status: '待審核' | '已核准' | '駁回';
  date: string;
}
