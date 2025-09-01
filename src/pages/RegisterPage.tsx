import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ui';
import { Building2, UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    try {
      // Mock de registro - simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula sucesso e redireciona para login
      navigate('/login', { 
        state: { message: 'Conta criada com sucesso! Faça login para continuar.' }
      });
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
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
          <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-600 mb-2">
            Criar Conta
          </h2>
          <p className="text-gray-600 text-lg">
            VSBank - Sua conta digital
          </p>
        </div>
        
        {/* Formulário */}
        <div className="bg-blue-600 rounded-2xl p-8 border border-blue-500/50 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
              <Input
                label="Nome completo"
                name="name"
                type="text"
                required
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={handleChange}
                autoFocus
                fullWidth
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                required
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              
              <Input
                label="CPF"
                name="cpf"
                type="text"
                required
                placeholder="Digite seu CPF"
                value={formData.cpf}
                onChange={handleChange}
                fullWidth
              />
              
              <Input
                label="Senha"
                name="password"
                type="password"
                required
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />
              
              <Input
                label="Confirmar senha"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
              />
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
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>

          <div className="text-center">
            <Link
              to="/login"
                className="font-medium text-blue-100 hover:text-white transition-colors text-lg"
            >
              Já tem uma conta? Faça login
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

export default RegisterPage; 