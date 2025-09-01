import { create } from 'zustand';

export interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'transfer' | 'pix' | 'payment';
  category: string;
  description: string;
  amount: number;
  balance: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  recipient?: {
    name: string;
    account: string;
    bank?: string;
  };
  sender?: {
    name: string;
    account: string;
    bank?: string;
  };
  reference?: string;
  tags?: string[];
  favorite?: boolean;
}

interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  filters: {
    type?: Transaction['type'];
    category?: string;
    status?: Transaction['status'];
    dateFrom?: Date;
    dateTo?: Date;
    minAmount?: number;
    maxAmount?: number;
    search?: string;
  };
  sortBy: 'date' | 'amount' | 'description';
  sortOrder: 'asc' | 'desc';
  
  // Actions
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setFilters: (filters: Partial<TransactionStore['filters']>) => void;
  setSort: (sortBy: TransactionStore['sortBy'], sortOrder: TransactionStore['sortOrder']) => void;
  clearFilters: () => void;
  
  // Computed
  getFilteredTransactions: () => Transaction[];
  getTransactionStats: () => {
    totalIncome: number;
    totalExpenses: number;
    netAmount: number;
    transactionCount: number;
  };
  getCategories: () => { category: string; count: number; total: number }[];
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    category: 'Salário',
    description: 'Salário - Empresa XYZ',
    amount: 5000.00,
    balance: 15420.75,
    timestamp: new Date('2024-12-01T08:00:00'),
    status: 'completed',
    sender: {
      name: 'Empresa XYZ Ltda',
      account: '123456-7',
      bank: 'Banco XYZ'
    }
  },
  {
    id: '2',
    type: 'debit',
    category: 'Alimentação',
    description: 'Supermercado ABC',
    amount: -150.50,
    balance: 15270.25,
    timestamp: new Date('2024-12-01T14:30:00'),
    status: 'completed',
    tags: ['essencial', 'alimentação']
  },
  {
    id: '3',
    type: 'pix',
    category: 'Transferência',
    description: 'PIX para João Silva',
    amount: -200.00,
    balance: 15070.25,
    timestamp: new Date('2024-12-01T16:45:00'),
    status: 'completed',
    recipient: {
      name: 'João Silva',
      account: '987654-3'
    },
    reference: 'PIX123456'
  },
  {
    id: '4',
    type: 'credit',
    category: 'Investimentos',
    description: 'Rendimento CDB',
    amount: 45.80,
    balance: 15116.05,
    timestamp: new Date('2024-12-01T18:00:00'),
    status: 'completed',
    tags: ['investimento', 'rendimento']
  },
  {
    id: '5',
    type: 'payment',
    category: 'Contas',
    description: 'Conta de Luz',
    amount: -89.90,
    balance: 15026.15,
    timestamp: new Date('2024-12-01T20:15:00'),
    status: 'completed',
    tags: ['conta', 'essencial']
  }
];

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: mockTransactions,
  isLoading: false,
  filters: {},
  sortBy: 'date',
  sortOrder: 'desc',

  fetchTransactions: async () => {
    set({ isLoading: true });
    try {
      // Simular chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ transactions: mockTransactions, isLoading: false });
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      set({ isLoading: false });
    }
  },

  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },

  updateTransaction: (id, updates) => {
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updates } : transaction
      ),
    }));
  },

  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction.id !== id),
    }));
  },

  toggleFavorite: (id) => {
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, favorite: !transaction.favorite } : transaction
      ),
    }));
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  setSort: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder });
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  getFilteredTransactions: () => {
    const { transactions, filters, sortBy, sortOrder } = get();
    
    let filtered = transactions.filter((transaction) => {
      if (filters.type && transaction.type !== filters.type) return false;
      if (filters.category && transaction.category !== filters.category) return false;
      if (filters.status && transaction.status !== filters.status) return false;
      if (filters.dateFrom && transaction.timestamp < filters.dateFrom) return false;
      if (filters.dateTo && transaction.timestamp > filters.dateTo) return false;
      if (filters.minAmount && transaction.amount < filters.minAmount) return false;
      if (filters.maxAmount && transaction.amount > filters.maxAmount) return false;
      if (filters.search) {
        const search = filters.search.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(search) ||
          transaction.category.toLowerCase().includes(search) ||
          transaction.recipient?.name.toLowerCase().includes(search) ||
          transaction.sender?.name.toLowerCase().includes(search)
        );
      }
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'date':
          aValue = a.timestamp.getTime();
          bValue = b.timestamp.getTime();
          break;
        case 'amount':
          aValue = Math.abs(a.amount);
          bValue = Math.abs(b.amount);
          break;
        case 'description':
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  },

  getTransactionStats: () => {
    const { transactions } = get();
    const stats = transactions.reduce(
      (acc, transaction) => {
        if (transaction.amount > 0) {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpenses += Math.abs(transaction.amount);
        }
        acc.transactionCount += 1;
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0, netAmount: 0, transactionCount: 0 }
    );
    
    stats.netAmount = stats.totalIncome - stats.totalExpenses;
    return stats;
  },

  getCategories: () => {
    const { transactions } = get();
    const categories = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = { count: 0, total: 0 };
      }
      acc[category].count += 1;
      acc[category].total += transaction.amount;
      return acc;
    }, {} as Record<string, { count: number; total: number }>);

    return Object.entries(categories).map(([category, data]) => ({
      category,
      count: data.count,
      total: data.total,
    }));
  },
})); 