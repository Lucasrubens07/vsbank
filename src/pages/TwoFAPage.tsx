import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const TwoFAPage = () => {
  const navigate = useNavigate();
  const { preToken, setToken, clear } = useAuthStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Verifica se tem preToken ao montar o componente
  useEffect(() => {
    if (!preToken) {
      navigate('/login');
      return;
    }
  }, []); // Executa apenas uma vez ao montar



  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Permite apenas um caractere
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move para o próximo input se digitou algo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move para o input anterior se pressionar backspace em campo vazio
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Digite o código completo de 6 dígitos');
      setIsLoading(false);
      return;
    }

    try {
      // Mock de verificação 2FA - simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula sucesso e gera token + usuário mock
      const mockToken = 'mock_token_' + Date.now();
      const mockUser = {
        id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        cpf: '123.456.789-00'
      };
      
      // Atualiza o estado primeiro
      setToken(mockToken, mockUser);
      
      // Redireciona para dashboard após atualizar o estado
      setTimeout(() => {
        navigate('/dashboard');
      }, 0);
    } catch (err) {
      setError('Código inválido. Tente novamente.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verificação em 2 Etapas
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite o código de 6 dígitos enviado para seu dispositivo
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code" className="sr-only">
              Código de verificação
            </label>
            <div className="flex justify-center space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="text-error-600 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading || code.join('').length !== 6}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verificando...' : 'Confirmar'}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFAPage; 