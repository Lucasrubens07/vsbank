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

const AppRoutes = () => {
  const { token } = useAuthStore();

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/twofa" element={<TwoFAPage />} />
      
      {/* Rota raiz - redireciona para login ou dashboard */}
      <Route 
        path="/" 
        element={
          token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } 
      />

      {/* Rotas Protegidas */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Dashboard Principal */}
        <Route index element={<HomePage />} />
        
        {/* Crédito */}
        <Route path="credito" element={<CreditPage />} />
        <Route path="credito/fgts" element={<UnderDevelopmentPage />} />
        <Route path="credito/consignado" element={<UnderDevelopmentPage />} />
        <Route path="credito/consorcio" element={<UnderDevelopmentPage />} />
        <Route path="credito/veicular" element={<UnderDevelopmentPage />} />
        <Route path="credito/rural" element={<UnderDevelopmentPage />} />
        <Route path="credito/portabilidade" element={<UnderDevelopmentPage />} />
        <Route path="credito/luz" element={<UnderDevelopmentPage />} />
        
        {/* PIX */}
        <Route path="pix" element={<PixPage />} />
        <Route path="pix/qr-code" element={<UnderDevelopmentPage />} />
        <Route path="pix/copiaecola" element={<UnderDevelopmentPage />} />
        <Route path="pix/extrato" element={<UnderDevelopmentPage />} />
        <Route path="pix/chaves" element={<UnderDevelopmentPage />} />
        <Route path="pix/duvidas" element={<UnderDevelopmentPage />} />
        
        {/* Minha Conta */}
        <Route path="minha-conta" element={<ProfilePage />} />
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes; 