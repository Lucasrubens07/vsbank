const CreditPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Crédito</h1>
        <p className="text-gray-600">Simule e contrate produtos de crédito</p>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Simulação de Empréstimo</h2>
        <p className="text-gray-600 mb-6">
          Simule um empréstimo pessoal com valores de até R$ 50.000,00
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor (máx. R$ 50.000)
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="R$ 0,00"
              max="50000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prazo
            </label>
            <select className="input-field">
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objetivo
            </label>
            <select className="input-field">
              <option value="">Selecione...</option>
              <option value="pessoal">Uso pessoal</option>
              <option value="trabalho">Trabalho</option>
              <option value="estudo">Estudo</option>
              <option value="outros">Outros</option>
            </select>
          </div>
        </div>
        
        <button className="btn-primary">
          Simular Empréstimo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Antecipação FGTS</h3>
          <p className="text-gray-600 mb-4">
            Antecipe seu FGTS e tenha dinheiro disponível quando precisar
          </p>
          <button className="btn-secondary w-full">
            Saiba Mais
          </button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crédito Consignado</h3>
          <p className="text-gray-600 mb-4">
            Empréstimo com desconto direto na folha de pagamento
          </p>
          <button className="btn-secondary w-full">
            Simular
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditPage; 