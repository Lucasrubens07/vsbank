import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TwoFAPage from '../pages/TwoFAPage';
import DashboardLayout from '../components/layout/DashboardLayout';
import HomePage from '../pages/HomePage';
import CreditPage from '../pages/CreditPage';
import PixPage from '../pages/PixPage';
import ProfilePage from '../pages/ProfilePage';
import { useAuthStore } from '../stores/authStore';

// Componente de proteção de rota
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Componente para rota de 2FA
const TwoFARoute = ({ children }: { children: React.ReactNode }) => {
  const { preToken } = useAuthStore();
  
  if (!preToken) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rota de 2FA (protegida por preToken) */}
      <Route path="/twofa" element={
        <TwoFARoute>
          <TwoFAPage />
        </TwoFARoute>
      } />
      
      {/* Rotas protegidas do dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<HomePage />} />
        <Route path="credito" element={<CreditPage />} />
        <Route path="pix" element={<PixPage />} />
        <Route path="minha-conta" element={<ProfilePage />} />
      </Route>
      
      {/* Redirecionamento padrão */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes; 