import { http, HttpResponse, delay } from 'msw';

// Tipos para os requests
interface LoginRequest {
  identifier: string;
  password: string;
}

interface TwoFARequest {
  code: string;
  preToken: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

// Dados mockados
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    cpf: '123.456.789-00'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    cpf: '987.654.321-00'
  }
];

const mockAccounts = [
  {
    id: '1',
    accountNumber: '0012345-6',
    balance: 5250.00,
    availableBalance: 5250.00,
    blockedBalance: 0.00
  },
  {
    id: '2',
    accountNumber: '0012346-7',
    balance: 3200.50,
    availableBalance: 3200.50,
    blockedBalance: 0.00
  }
];

const mockTransactions = [
  {
    id: '1',
    type: 'IN' as const,
    amount: 150.00,
    description: 'Transferência PIX recebida',
    date: '2024-09-01T10:30:00Z',
    status: 'COMPLETED' as const
  },
  {
    id: '2',
    type: 'OUT' as const,
    amount: 89.90,
    description: 'Pagamento de conta de luz',
    date: '2024-08-31T15:45:00Z',
    status: 'COMPLETED' as const
  },
  {
    id: '3',
    type: 'IN' as const,
    amount: 500.00,
    description: 'Depósito em dinheiro',
    date: '2024-08-30T09:15:00Z',
    status: 'COMPLETED' as const
  },
  {
    id: '4',
    type: 'PIX' as const,
    amount: 75.50,
    description: 'Transferência PIX enviada',
    date: '2024-08-29T14:20:00Z',
    status: 'COMPLETED' as const
  }
];

// Handlers para autenticação
export const authHandlers = [
  // POST /auth/login
  http.post('/api/auth/login', async ({ request }) => {
    await delay(1000); // Simula delay de rede
    
    const { identifier, password } = await request.json() as LoginRequest;
    
    // Validação básica
    if (!identifier || !password) {
      return HttpResponse.json(
        { error: 'Email/CPF e senha são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Simula validação de credenciais
    const user = mockUsers.find(u => 
      u.email === identifier || u.cpf === identifier
    );
    
    if (!user) {
      return HttpResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }
    
    // Gera preToken para 2FA
    const preToken = `pre_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return HttpResponse.json({
      message: 'Login realizado com sucesso',
      preToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }),

  // POST /auth/2fa
  http.post('/api/auth/2fa', async ({ request }) => {
    await delay(800); // Simula delay de rede
    
    const { code, preToken } = await request.json() as TwoFARequest;
    
    // Validação básica
    if (!code || !preToken) {
      return HttpResponse.json(
        { error: 'Código e preToken são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Simula validação do código 2FA
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return HttpResponse.json(
        { error: 'Código inválido' },
        { status: 400 }
      );
    }
    
    // Gera token de acesso
    const token = `access_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user = mockUsers[0]; // Usuário padrão
    
    return HttpResponse.json({
      message: 'Autenticação 2FA realizada com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf
      }
    });
  }),

  // POST /auth/register
  http.post('/api/auth/register', async ({ request }) => {
    await delay(1200); // Simula delay de rede
    
    const { name, email, cpf, password } = await request.json() as RegisterRequest;
    
    // Validação básica
    if (!name || !email || !cpf || !password) {
      return HttpResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Simula validação de email único
    if (mockUsers.find(u => u.email === email)) {
      return HttpResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      );
    }
    
    // Simula validação de CPF único
    if (mockUsers.find(u => u.cpf === cpf)) {
      return HttpResponse.json(
        { error: 'CPF já cadastrado' },
        { status: 409 }
      );
    }
    
    return HttpResponse.json({
      message: 'Conta criada com sucesso',
      user: { name, email, cpf }
    });
  })
];

// Handlers para dados da conta
export const accountHandlers = [
  // GET /api/account/me
  http.get('/api/account/me', async ({ request }) => {
    await delay(500);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Token de autenticação inválido' },
        { status: 401 }
      );
    }
    
    const user = mockUsers[0];
    const account = mockAccounts[0];
    
    return HttpResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf
      },
      account: {
        id: account.id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        availableBalance: account.availableBalance,
        blockedBalance: account.blockedBalance
      }
    });
  }),

  // GET /api/account/summary
  http.get('/api/account/summary', async ({ request }) => {
    await delay(300);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Token de autenticação inválido' },
        { status: 401 }
      );
    }
    
    const user = mockUsers[0];
    const account = mockAccounts[0];
    
    // Calcula resumo das transações
    const recentTransactions = mockTransactions.slice(0, 5);
    const totalIn = recentTransactions
      .filter(t => t.type === 'IN')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalOut = recentTransactions
      .filter(t => t.type === 'OUT')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return HttpResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf
      },
      account: {
        id: account.id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        availableBalance: account.availableBalance,
        blockedBalance: account.blockedBalance
      },
      summary: {
        totalIn,
        totalOut,
        balance: totalIn - totalOut,
        transactionCount: recentTransactions.length
      }
    });
  }),

  // GET /api/transactions
  http.get('/api/transactions', async ({ request }) => {
    await delay(400);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Token de autenticação inválido' },
        { status: 401 }
      );
    }
    
    const url = new URL(request.url);
    const days = url.searchParams.get('days') || '7';
    const type = url.searchParams.get('type');
    
    let filteredTransactions = [...mockTransactions];
    
    // Filtra por tipo se especificado
    if (type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === type);
    }
    
    // Filtra por dias (simulação)
    const daysAgo = parseInt(days);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    
    filteredTransactions = filteredTransactions.filter(t => 
      new Date(t.date) >= cutoffDate
    );
    
    return HttpResponse.json({
      transactions: filteredTransactions,
      total: filteredTransactions.length,
      days: daysAgo
    });
  })
];

// Combina todos os handlers
export const handlers = [
  ...authHandlers,
  ...accountHandlers
]; 