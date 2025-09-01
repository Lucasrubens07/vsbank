import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button, Input } from '../components/ui';
import { Building2, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setPreToken, setLoading, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock de login - simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula sucesso e gera preToken
      const mockPreToken = 'mock_pre_token_' + Date.now();
      setPreToken(mockPreToken);
      
      // Redireciona para 2FA
      navigate('/twofa');
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Logo e Título */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-blue-600 mb-2">
            VSBank
          </h2>
          <p className="text-gray-600 text-lg">
            Faça login na sua conta
          </p>
        </div>
        
        {/* Formulário */}
        <div className="bg-blue-600 rounded-2xl p-8 border border-blue-500/50 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email ou CPF"
                name="identifier"
                type="text"
                required
                placeholder="Digite seu email ou CPF"
                value={formData.identifier}
                onChange={handleChange}
                autoFocus
                fullWidth
              />
              
              <div className="relative">
                <Input
                  label="Senha"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  rightIcon={showPassword ? EyeOff : Eye}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-200 text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="text-center">
              <Link
                to="/register"
                className="font-medium text-blue-100 hover:text-white transition-colors text-lg"
              >
                Criar conta
              </Link>
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

export default LoginPage; 