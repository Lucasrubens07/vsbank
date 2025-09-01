import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/api';
import { loginSchema, type LoginFormData } from '../schemas/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setPreToken, setLoading } = useAuthStore();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(data.identifier, data.password);
      setPreToken(response.preToken);
      navigate('/twofa');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            VSBank
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Faça login na sua conta
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="identifier" className="sr-only">
                Email ou CPF
              </label>
              <input
                id="identifier"
                type="text"
                className={`input-field rounded-t-md ${
                  errors.identifier ? 'border-error-500 focus:ring-error-500' : ''
                }`}
                placeholder="Email ou CPF"
                autoFocus
                {...register('identifier')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className={`input-field rounded-b-md ${
                  errors.password ? 'border-error-500 focus:ring-error-500' : ''
                }`}
                placeholder="Senha"
                {...register('password')}
              />
            </div>
          </div>

          {/* Mensagens de erro dos campos */}
          {errors.identifier && (
            <div className="text-error-600 text-sm text-center">
              {errors.identifier.message}
            </div>
          )}
          {errors.password && (
            <div className="text-error-600 text-sm text-center">
              {errors.password.message}
            </div>
          )}

          {/* Mensagem de erro geral */}
          {error && (
            <div className="text-error-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 