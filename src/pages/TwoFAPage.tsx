import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui';
import { Building2, Shield, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Logo e Título */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Verificação em 2 Etapas
          </h2>
          <p className="text-gray-600 text-lg">
            Digite o código de 6 dígitos enviado para seu dispositivo
          </p>
        </div>
        
        {/* Formulário */}
        <div className="bg-blue-600 rounded-2xl p-8 border border-blue-500/50 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="sr-only">
                Código de verificação
              </label>
              <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 bg-white/20 text-white placeholder-white/50 transition-all duration-200 hover:border-white/50"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-200 text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={code.join('').length !== 6}
              >
                {isLoading ? 'Verificando...' : 'Confirmar'}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                size="lg"
                fullWidth
                onClick={handleCancel}
                icon={ArrowLeft}
                className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
              >
                Voltar ao Login
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © 2024 VSBank. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwoFAPage; 