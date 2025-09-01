import type { User, Account, Transaction } from '../types';

// Configuração base da API
const API_BASE_URL = '/api';

// Headers padrão
const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});



interface LoginResponse {
  message: string;
  preToken: string;
  user: Partial<User>;
}

interface TwoFAResponse {
  message: string;
  token: string;
  user: User;
}

interface RegisterResponse {
  message: string;
  user: Partial<User>;
}

interface AccountSummaryResponse {
  user: User;
  account: Account;
  summary?: {
    totalIn: number;
    totalOut: number;
    balance: number;
    transactionCount: number;
  };
}

interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  days: number;
}

// Serviços de autenticação
export const authService = {
  // Login
  async login(identifier: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao fazer login');
    }

    return response.json();
  },

  // Verificação 2FA
  async verify2FA(code: string, preToken: string): Promise<TwoFAResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/2fa`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code, preToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro na verificação 2FA');
    }

    return response.json();
  },

  // Registro
  async register(userData: {
    name: string;
    email: string;
    cpf: string;
    password: string;
  }): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar conta');
    }

    return response.json();
  },
};

// Serviços de conta
export const accountService = {
  // Obter dados do usuário e conta
  async getAccountInfo(token: string): Promise<AccountSummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/account/me`, {
      method: 'GET',
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao obter dados da conta');
    }

    return response.json();
  },

  // Obter resumo da conta
  async getAccountSummary(token: string): Promise<AccountSummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/account/summary`, {
      method: 'GET',
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao obter resumo da conta');
    }

    return response.json();
  },

  // Obter transações
  async getTransactions(
    token: string,
    days: number = 7,
    type?: 'IN' | 'OUT' | 'PIX'
  ): Promise<TransactionsResponse> {
    const params = new URLSearchParams({ days: days.toString() });
    if (type) {
      params.append('type', type);
    }

    const response = await fetch(`${API_BASE_URL}/transactions?${params}`, {
      method: 'GET',
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao obter transações');
    }

    return response.json();
  },
}; 