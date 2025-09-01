import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TwoFAPage from '../pages/TwoFAPage';
import DashboardLayout from '../components/layout/DashboardLayout';
import HomePage from '../pages/HomePage';
import CreditPage from '../pages/CreditPage';
import PixPage from '../pages/PixPage';
import ProfilePage from '../pages/ProfilePage';
import UnderDevelopmentPage from '../pages/UnderDevelopmentPage';
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
        
        {/* Rotas de Home */}
        <Route path="entrada" element={<UnderDevelopmentPage type="entrada" />} />
        <Route path="saida" element={<UnderDevelopmentPage type="saida" />} />
        <Route path="relatorio" element={<UnderDevelopmentPage type="relatorio" />} />
        
        {/* Rotas de Crédito */}
        <Route path="credito/fgts" element={<UnderDevelopmentPage type="fgts" />} />
        <Route path="credito/consignado" element={<UnderDevelopmentPage type="consignado" />} />
        <Route path="credito/consorcios" element={<UnderDevelopmentPage type="consorcios" />} />
        <Route path="credito/veicular" element={<UnderDevelopmentPage type="veicular" />} />
        <Route path="credito/rural" element={<UnderDevelopmentPage type="rural" />} />
        <Route path="credito/portabilidade" element={<UnderDevelopmentPage type="portabilidade" />} />
        <Route path="credito/luz" element={<UnderDevelopmentPage type="luz" />} />
        
        {/* Rotas de PIX */}
        <Route path="pix/copiaecola" element={<UnderDevelopmentPage type="copiaecola" />} />
        <Route path="pix/extrato" element={<UnderDevelopmentPage type="extrato" />} />
        <Route path="pix/chaves" element={<UnderDevelopmentPage type="chaves" />} />
        <Route path="pix/duvidas" element={<UnderDevelopmentPage type="duvidas" />} />
        
        {/* Outras rotas */}
        <Route path="cartao" element={<UnderDevelopmentPage type="cartao" />} />
        <Route path="investimentos" element={<UnderDevelopmentPage type="investimentos" />} />
      </Route>
      
      {/* Redirecionamento padrão */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes; 