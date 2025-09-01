import { useState } from 'react';
import { 
  QrCode, 
  Copy, 
  ArrowUpRight, 
  ArrowDownLeft,
  Key,
  History,
  Download,
  EyeOff,
  CheckCircle,
  Info
} from 'lucide-react';

interface PixTransfer {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
  sender?: string;
}

interface PixKey {
  id: string;
  type: 'cpf' | 'email' | 'phone' | 'random';
  value: string;
  isActive: boolean;
  createdAt: string;
}

const PixPage = () => {
  const [activeTab, setActiveTab] = useState<'transfer' | 'qr' | 'keys' | 'history'>('transfer');
  const [transferData, setTransferData] = useState({
    pixKey: '',
    amount: '',
    description: '',
    keyType: 'cpf' as 'cpf' | 'email' | 'phone' | 'random'
  });
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState({
    amount: '',
    description: '',
    recipient: 'João Silva'
  });

  const [pixKeys] = useState<PixKey[]>([
    {
      id: '1',
      type: 'cpf',
      value: '123.456.789-00',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      type: 'email',
      value: 'joao@email.com',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      type: 'phone',
      value: '(11) 99999-9999',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      type: 'random',
      value: 'abc123def456',
      isActive: false,
      createdAt: '2024-01-01'
    }
  ]);

  const [transfers] = useState<PixTransfer[]>([
    {
      id: '1',
      type: 'sent',
      amount: 150.00,
      description: 'Pagamento almoço',
      date: '2024-01-15',
      status: 'completed',
      recipient: 'Maria Silva'
    },
    {
      id: '2',
      type: 'received',
      amount: 500.00,
      description: 'Reembolso',
      date: '2024-01-14',
      status: 'completed',
      sender: 'Empresa XYZ'
    },
    {
      id: '3',
      type: 'sent',
      amount: 89.90,
      description: 'Conta Netflix',
      date: '2024-01-13',
      status: 'completed',
      recipient: 'Netflix'
    },
    {
      id: '4',
      type: 'received',
      amount: 250.00,
      description: 'Freelance',
      date: '2024-01-12',
      status: 'completed',
      sender: 'Cliente ABC'
    }
  ]);

  const tabs = [
    { id: 'transfer', name: 'Transferir', icon: <ArrowUpRight className="w-4 h-4" /> },
    { id: 'qr', name: 'QR Code', icon: <QrCode className="w-4 h-4" /> },
    { id: 'keys', name: 'Minhas Chaves', icon: <Key className="w-4 h-4" /> },
    { id: 'history', name: 'Extrato PIX', icon: <History className="w-4 h-4" /> }
  ];

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria feita a chamada para a API de transferência PIX
    alert('Transferência PIX realizada com sucesso!');
    setTransferData({ pixKey: '', amount: '', description: '', keyType: 'cpf' });
  };

  const handleInputChange = (field: keyof typeof transferData, value: string) => {
    setTransferData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateQR = () => {
    if (qrData.amount && qrData.description) {
      setShowQR(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para a área de transferência!');
  };

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
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-600 bg-success-100';
      case 'pending':
        return 'text-warning-600 bg-warning-100';
      case 'failed':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          PIX - Transferências Instantâneas
        </h1>
        <p className="text-gray-600">
          Envie e receba dinheiro em segundos, 24 horas por dia
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="min-h-[500px]">
        {/* Tab: Transferir */}
        {activeTab === 'transfer' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ArrowUpRight className="w-5 h-5 mr-2 text-primary-600" />
                  Nova Transferência PIX
                </h2>

                <form onSubmit={handleTransfer} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Chave
                    </label>
                    <select
                      value={transferData.keyType}
                      onChange={(e) => handleInputChange('keyType', e.target.value)}
                      className="input-field"
                    >
                      <option value="cpf">CPF</option>
                      <option value="email">E-mail</option>
                      <option value="phone">Telefone</option>
                      <option value="random">Chave Aleatória</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chave PIX
                    </label>
                    <input
                      type="text"
                      value={transferData.pixKey}
                      onChange={(e) => handleInputChange('pixKey', e.target.value)}
                      className="input-field"
                      placeholder={
                        transferData.keyType === 'cpf' ? '000.000.000-00' :
                        transferData.keyType === 'email' ? 'exemplo@email.com' :
                        transferData.keyType === 'phone' ? '(11) 99999-9999' :
                        'Chave aleatória'
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        R$
                      </span>
                      <input
                        type="number"
                        value={transferData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="0,00"
                        step="0.01"
                        min="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição (opcional)
                    </label>
                    <input
                      type="text"
                      value={transferData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="input-field"
                      placeholder="Ex: Pagamento almoço"
                      maxLength={140}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Transferir PIX
                  </button>
                </form>
              </div>

              {/* Informações sobre PIX */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      Sobre o PIX
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Transferências instantâneas 24h por dia</li>
                      <li>• Disponível em feriados e finais de semana</li>
                      <li>• Sem taxas para transferências</li>
                      <li>• Limite diário de R$ 10.000 por chave</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo da Transferência */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo da Transferência
              </h3>
              
              {transferData.amount ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Valor:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatCurrency(Number(transferData.amount))}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Transferência via PIX
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chave PIX:</span>
                      <span className="font-medium">{transferData.pixKey || 'Não informada'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Descrição:</span>
                      <span className="font-medium">{transferData.description || 'Não informada'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxa:</span>
                      <span className="font-medium text-success-600">Grátis</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <ArrowUpRight className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Preencha os dados para ver o resumo</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: QR Code */}
        {activeTab === 'qr' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <QrCode className="w-5 h-5 mr-2 text-primary-600" />
                  Gerar QR Code PIX
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor (opcional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        R$
                      </span>
                      <input
                        type="number"
                        value={qrData.amount}
                        onChange={(e) => setQrData(prev => ({ ...prev, amount: e.target.value }))}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="0,00"
                        step="0.01"
                        min="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição (opcional)
                    </label>
                    <input
                      type="text"
                      value={qrData.description}
                      onChange={(e) => setQrData(prev => ({ ...prev, description: e.target.value }))}
                      className="input-field"
                      placeholder="Ex: Pagamento"
                      maxLength={140}
                    />
                  </div>

                  <button
                    onClick={generateQR}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Gerar QR Code
                  </button>
                </div>
              </div>

              {/* Informações do QR Code */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">
                      Como usar o QR Code
                    </h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Compartilhe o QR Code com quem deve pagar</li>
                      <li>• A pessoa escaneia com o app do banco</li>
                      <li>• Confirma o valor e descrição</li>
                      <li>• Dinheiro cai na sua conta instantaneamente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualização do QR Code */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Seu QR Code PIX
              </h3>
              
              {showQR ? (
                <div className="text-center space-y-4">
                  <div className="bg-gray-100 rounded-lg p-8 inline-block">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Chave PIX: {pixKeys[0].value}</p>
                    {qrData.amount && (
                      <p className="text-lg font-semibold text-primary-600">
                        Valor: {formatCurrency(Number(qrData.amount))}
                      </p>
                    )}
                    {qrData.description && (
                      <p className="text-sm text-gray-600">
                        Descrição: {qrData.description}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(pixKeys[0].value)}
                      className="btn-secondary flex items-center justify-center flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Chave
                    </button>
                    <button className="btn-secondary flex items-center justify-center flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar QR
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-16">
                  <QrCode className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Preencha os dados e gere seu QR Code</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Minhas Chaves */}
        {activeTab === 'keys' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Key className="w-5 h-5 mr-2 text-primary-600" />
                  Minhas Chaves PIX
                </h2>
                <button className="btn-primary">
                  Nova Chave
                </button>
              </div>

              <div className="space-y-4">
                {pixKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        key.isActive ? 'bg-success-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">
                          {key.type === 'cpf' ? 'CPF' :
                           key.type === 'email' ? 'E-mail' :
                           key.type === 'phone' ? 'Telefone' : 'Chave Aleatória'}
                        </p>
                        <p className="text-sm text-gray-600">{key.value}</p>
                        <p className="text-xs text-gray-500">
                          Criada em {new Date(key.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(key.value)}
                        className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                        title="Copiar chave"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-error-600 transition-colors" title="Desativar">
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Extrato PIX */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <History className="w-5 h-5 mr-2 text-primary-600" />
                  Extrato PIX
                </h2>
                <button className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </button>
              </div>

              <div className="space-y-4">
                {transfers.map((transfer) => (
                  <div
                    key={transfer.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transfer.type === 'sent' ? 'bg-error-100' : 'bg-success-100'
                      }`}>
                        {transfer.type === 'sent' ? (
                          <ArrowUpRight className="w-5 h-5 text-error-600" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-success-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transfer.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>
                            {transfer.type === 'sent' ? 'Para:' : 'De:'} 
                            {transfer.type === 'sent' ? transfer.recipient : transfer.sender}
                          </span>
                          <span>•</span>
                          <span>{formatDate(transfer.date)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-semibold text-lg ${
                        transfer.type === 'sent' ? 'text-error-600' : 'text-success-600'
                      }`}>
                        {transfer.type === 'sent' ? '-' : '+'} {formatCurrency(transfer.amount)}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                        {getStatusText(transfer.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PixPage; 