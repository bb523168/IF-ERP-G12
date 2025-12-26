
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

export type UserRole = '建築師' | '經理' | '設計師';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  caseName: string;
  location: string;
  product: string;
  status: string;
  progress: number;
  budget: number;
  year: number;
  affiliation: '如果' | '樂果' | '成果';
  natures: string[];
  notes: string;
  hireDate?: string;
}

export interface FinanceEntry {
  id: string;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  taxCategory: string; // 執行業務所得支出分類
}

export interface SalaryRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  allowance: number;
  overtime: number;
  bonus: number;
  laborInsurance: number;
  withholdingTax: number;
  leaveDeduction: number;
  netSalary: number;
}

export interface IncomeVoucher {
  id: string;
  code: string; // 合約編號+流水號
  date: string;
  projectId: string;
  amount: number;
  description: string;
}

export interface AccountReceivable {
  id: string;
  projectCode: string;
  phase: string;
  amount: number;
  withholdingTax: number;
  netAmount: number;
  billingDate: string;
  checkDate?: string;
  receivedDate?: string;
  status: '未達請款條件' | '請款中' | '已收期票' | '已收訖';
  remittanceDate?: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: '在職' | '請假' | '離職';
  hireDate: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  requester: string;
  status: '待審核' | '已核准' | '駁回';
  date: string;
}

export interface Contact {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface Customer {
  id: string;
  code: string;
  category: string;
  companyName: string;
  taxId: string;
  address: string;
  contacts: Contact[];
  paymentTerms: string;
}

export interface Quotation {
  id: string;
  date: string;
  product: string;
  isApproved: boolean;
  totalAmount?: number;
}
