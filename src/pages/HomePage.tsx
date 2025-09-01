import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Button, Card } from '../components/ui';
import { useToast } from '../hooks';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft,
  Clock,
  Calendar,
  User
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface QuickService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}

const HomePage = () => {
  const { user } = useAuthStore();
  const { showSuccess } = useToast();
  const [balance] = useState(15420.75);
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      description: 'Salário - Empresa XYZ',
      amount: 3500.00,
      date: '2024-01-15',
      category: 'Salário'
    },
    {
      id: '2',
      type: 'debit',
      description: 'Supermercado Extra',
      amount: 245.80,
      date: '2024-01-14',
      category: 'Alimentação'
    },
    {
      id: '3',
      type: 'credit',
      description: 'Transferência PIX - João Silva',
      amount: 150.00,
      date: '2024-01-13',
      category: 'Transferência'
    },
    {
      id: '4',
      type: 'debit',
      description: 'Uber - Corrida',
      amount: 32.50,
      date: '2024-01-12',
      category: 'Transporte'
    },
    {
      id: '5',
      type: 'debit',
      description: 'Netflix - Assinatura',
      amount: 39.90,
      date: '2024-01-11',
      category: 'Entretenimento'
    }
  ]);

  const quickServices: QuickService[] = [
    {
      id: '1',
      name: 'PIX',
      description: 'Transferir dinheiro',
      icon: <ArrowUpRight className="w-6 h-6" />,
      color: 'bg-blue-600',
      route: '/dashboard/pix'
    },
    {
      id: '2',
      name: 'Crédito',
      description: 'Simular empréstimo',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-600',
      route: '/dashboard/credito'
    },
    {
      id: '3',
      name: 'Cartão',
      description: 'Ver fatura',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-orange-600',
      route: '/dashboard/cartao'
    },
    {
      id: '4',
      name: 'Investir',
      description: 'Aplicar dinheiro',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-purple-600',
      route: '/dashboard/investimentos'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Salário':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Transferência':
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
      case 'Alimentação':
        return <User className="w-4 h-4 text-orange-600" />;
      case 'Transporte':
        return <Clock className="w-4 h-4 text-red-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleQuickServiceClick = (serviceName: string) => {
    showSuccess('Serviço Acessado', `Você clicou em ${serviceName}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com saudação */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.name?.split(' ')[0] || 'Usuário'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Bem-vindo ao seu VSBank</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última atualização</p>
          <p className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Card de Saldo */}
      <Card className="bg-blue-600 border-blue-500/50 shadow-xl">
        <div className="p-6 text-white">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Saldo Disponível</h2>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <DollarSign className="w-6 h-6" />
            </div>
        </div>
          <div className="text-4xl font-bold mb-3 text-blue-100">
          {formatCurrency(balance)}
        </div>
          <div className="flex items-center space-x-4 text-sm text-blue-200">
          <span>Conta Corrente</span>
          <span>•</span>
          <span>Agência: 0001</span>
          <span>•</span>
          <span>Conta: 123456-7</span>
        </div>
      </div>
      </Card>

      {/* Serviços Rápidos */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Serviços Rápidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickServices.map((service) => (
            <div
              key={service.id}
              className="cursor-pointer group transition-all duration-300"
              onClick={() => handleQuickServiceClick(service.name)}
            >
              <Card className="p-4 border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:shadow-lg">
                <div className={`${service.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {service.icon}
              </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Transações Recentes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Transações Recentes
          </h2>
          <Button variant="ghost" size="sm">
            Ver todas
          </Button>
        </div>
        
        <Card className="overflow-hidden">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 ${
                index !== transactions.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-all duration-200`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                  {getCategoryIcon(transaction.category)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{transaction.category}</span>
                    <span>•</span>
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-bold text-lg ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Cards Informativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">Limite do Cartão</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">
            {formatCurrency(5000)}
          </p>
          <p className="text-gray-600">
            Disponível: {formatCurrency(3247.30)}
          </p>
        </Card>

        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">Investimentos</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">
            {formatCurrency(8750.45)}
          </p>
          <p className="text-gray-600">
            +2.3% este mês
          </p>
        </Card>

        <Card className="p-6 border-orange-200 bg-orange-50">
           <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-lg">Próximos Vencimentos</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
           </div>
          <p className="text-3xl font-bold text-orange-600 mb-2">
             {formatCurrency(1247.80)}
           </p>
          <p className="text-gray-600">
             Vence em 5 dias
           </p>
        </Card>
      </div>
    </div>
  );
};

export default HomePage; 