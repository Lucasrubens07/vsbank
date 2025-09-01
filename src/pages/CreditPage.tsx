import { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight
} from 'lucide-react';

interface LoanSimulation {
  amount: number;
  term: number;
  rate: number;
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
}

const CreditPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<'personal' | 'fgts' | 'consignado'>('personal');
  const [simulation, setSimulation] = useState<LoanSimulation>({
    amount: 10000,
    term: 12,
    rate: 2.99,
    monthlyPayment: 0,
    totalAmount: 0,
    totalInterest: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    income: '',
    employer: ''
  });

  const products = [
    {
      id: 'personal',
      name: 'Empréstimo Pessoal',
      description: 'Dinheiro na conta para qualquer finalidade',
      rate: '2.99% a.m.',
      maxAmount: 'R$ 50.000',
      maxTerm: '60 meses',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-primary-500',
      features: [
        'Aprovação em até 24h',
        'Sem comprovação de renda',
        'Dinheiro na conta em até 1 dia útil',
        'Sem consulta ao SPC/Serasa'
      ]
    },
    {
      id: 'fgts',
      name: 'Antecipação FGTS',
      description: 'Antecipe até 5 anos do seu FGTS',
      rate: '1.99% a.m.',
      maxAmount: 'R$ 100.000',
      maxTerm: '60 meses',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-success-500',
      features: [
        'Taxa reduzida para aposentados',
        'Sem consulta ao SPC/Serasa',
        'Aprovação em até 48h',
        'Dinheiro na conta em até 2 dias úteis'
      ]
    },
    {
      id: 'consignado',
      name: 'Empréstimo Consignado',
      description: 'Desconto direto na folha de pagamento',
      rate: '1.49% a.m.',
      maxAmount: 'R$ 200.000',
      maxTerm: '84 meses',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-warning-500',
      features: [
        'Taxa mais baixa do mercado',
        'Desconto automático na folha',
        'Aprovação em até 72h',
        'Sem consulta ao SPC/Serasa'
      ]
    }
  ];

  const calculateLoan = () => {
    const { amount, term, rate } = simulation;
    const monthlyRate = rate / 100;
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalAmount = monthlyPayment * term;
    const totalInterest = totalAmount - amount;

    setSimulation(prev => ({
      ...prev,
      monthlyPayment,
      totalAmount,
      totalInterest
    }));
  };

  const handleInputChange = (field: keyof typeof simulation, value: number) => {
    setSimulation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const selectedProductData = products.find(p => p.id === selectedProduct);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Crédito e Empréstimos
        </h1>
        <p className="text-gray-600">
          Simule e solicite o empréstimo ideal para suas necessidades
        </p>
      </div>

      {/* Seleção de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selectedProduct === product.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => setSelectedProduct(product.id as any)}
          >
            <div className={`${product.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3`}>
              {product.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div className="space-y-1 text-sm">
              <p className="text-primary-600 font-medium">Taxa: {product.rate}</p>
              <p className="text-gray-600">Até {product.maxAmount}</p>
              <p className="text-gray-600">Até {product.maxTerm}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulação */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600" />
              Simulação de Empréstimo
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Empréstimo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    value={simulation.amount}
                    onChange={(e) => handleInputChange('amount', Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    min="1000"
                    max="200000"
                    step="1000"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Min: R$ 1.000</span>
                  <span>Max: R$ 200.000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo (meses)
                </label>
                <input
                  type="range"
                  min="6"
                  max="84"
                  value={simulation.term}
                  onChange={(e) => handleInputChange('term', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6 meses</span>
                  <span>{simulation.term} meses</span>
                  <span>84 meses</span>
                </div>
              </div>

              <button
                onClick={calculateLoan}
                className="w-full btn-primary flex items-center justify-center"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Simulação
              </button>
            </div>
          </div>

          {/* Resultado da Simulação */}
          {simulation.monthlyPayment > 0 && (
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Resultado da Simulação</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Parcela Mensal:</span>
                  <span className="font-bold text-xl">
                    {formatCurrency(simulation.monthlyPayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total a Pagar:</span>
                  <span className="font-bold">
                    {formatCurrency(simulation.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total de Juros:</span>
                  <span className="font-bold">
                    {formatCurrency(simulation.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Juros:</span>
                  <span className="font-bold">
                    {simulation.rate}% a.m.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Solicitação */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-success-600" />
              Solicitar Empréstimo
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleFormChange('cpf', e.target.value)}
                    className="input-field"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Renda Mensal
                  </label>
                  <input
                    type="number"
                    value={formData.income}
                    onChange={(e) => handleFormChange('income', e.target.value)}
                    className="input-field"
                    placeholder="R$ 0,00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empregador
                  </label>
                  <input
                    type="text"
                    value={formData.employer}
                    onChange={(e) => handleFormChange('employer', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
              >
                Solicitar Empréstimo
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>

          {/* Benefícios do Produto */}
          {selectedProductData && (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-info-600" />
                Benefícios do {selectedProductData.name}
              </h3>
              <ul className="space-y-2">
                {selectedProductData.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Informações Importantes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Informações Importantes
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• A aprovação está sujeita à análise de crédito</li>
              <li>• As taxas podem variar conforme o perfil do cliente</li>
              <li>• Documentos podem ser solicitados para análise</li>
              <li>• O valor aprovado pode ser diferente do solicitado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPage; 