import { useAuthStore } from '../stores/authStore';

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, {user?.name}!</h1>
        <p className="text-gray-600">Acompanhe sua conta e movimentações</p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cliente/CPF</h3>
          <p className="text-2xl font-bold text-primary-600">{user?.name}</p>
          <p className="text-gray-600">{user?.cpf}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Saldo Disponível</h3>
          <p className="text-2xl font-bold text-success-600">R$ 5.250,00</p>
          <p className="text-sm text-gray-500">Conta Corrente</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Serviços Rápidos</h3>
          <div className="space-y-2">
            <button className="btn-primary w-full text-sm">Depositar</button>
            <button className="btn-secondary w-full text-sm">Sacar</button>
            <button className="btn-secondary w-full text-sm">Recarga</button>
          </div>
        </div>
      </div>

      {/* Movimentações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Movimentações (15 dias)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Transferência PIX</p>
                <p className="text-sm text-gray-500">01/09/2024</p>
              </div>
              <span className="text-success-600 font-semibold">+R$ 150,00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Pagamento de Conta</p>
                <p className="text-sm text-gray-500">31/08/2024</p>
              </div>
              <span className="text-error-600 font-semibold">-R$ 89,90</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">Depósito</p>
                <p className="text-sm text-gray-500">30/08/2024</p>
              </div>
              <span className="text-success-600 font-semibold">+R$ 500,00</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo (7 dias)</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Entradas:</span>
              <span className="font-semibold text-success-600">R$ 650,00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saídas:</span>
              <span className="font-semibold text-error-600">R$ 289,90</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-900 font-medium">Saldo:</span>
              <span className="font-bold text-primary-600">R$ 360,10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 