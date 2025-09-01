const PixPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">PIX</h1>
        <p className="text-gray-600">Transfira dinheiro de forma rápida e segura</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transferir PIX */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transferir PIX</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chave PIX
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Digite a chave PIX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="R$ 0,00"
                step="0.01"
                min="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (opcional)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Descrição da transferência"
              />
            </div>
            
            <button className="btn-primary w-full">
              Transferir
            </button>
          </div>
        </div>

        {/* Gerar QR Code */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Gerar QR Code</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (opcional)
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="R$ 0,00"
                step="0.01"
                min="0.01"
              />
            </div>
            
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                  <span className="text-gray-400 text-xs">QR Code</span>
                </div>
                <p className="text-sm text-gray-500">QR Code será gerado aqui</p>
              </div>
            </div>
            
            <button className="btn-secondary w-full">
              Gerar QR Code
            </button>
          </div>
        </div>
      </div>

      {/* Funcionalidades adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Copia e Cola</h3>
          <p className="text-gray-600 mb-4">
            Use códigos PIX para pagamentos
          </p>
          <button className="btn-secondary w-full">
            Acessar
          </button>
        </div>

        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Extrato PIX</h3>
          <p className="text-gray-600 mb-4">
            Visualize todas as transações PIX
          </p>
          <button className="btn-secondary w-full">
            Acessar
          </button>
        </div>

        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Minhas Chaves</h3>
          <p className="text-gray-600 mb-4">
            Gerencie suas chaves PIX
          </p>
          <button className="btn-secondary w-full">
            Acessar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PixPage; 