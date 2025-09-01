// Tipos de usuário e autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

export interface AuthState {
  preToken?: string;
  token?: string;
  user?: User;
  isLoading: boolean;
}

// Tipos de conta
export interface Account {
  id: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
  blockedBalance: number;
}

export interface AccountSummary {
  account: Account;
  user: User;
}

// Tipos de transações
export interface Transaction {
  id: string;
  type: 'IN' | 'OUT' | 'PIX';
  amount: number;
  description: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

// Tipos de crédito
export interface LoanSimulation {
  amount: number;
  term: 12 | 24 | 36;
  purpose: string;
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
}

// Tipos de PIX
export interface PixKey {
  id: string;
  key: string;
  type: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'RANDOM';
  isActive: boolean;
}

export interface PixTransfer {
  key: string;
  amount: number;
  description?: string;
}

// Tipos de navegação
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: SidebarItem[];
} 