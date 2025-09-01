import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Home, 
  CreditCard, 
  QrCode, 
  User, 
  LogOut,
  Building2
} from 'lucide-react';

const Sidebar = () => {
  const { clear } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clear();
    navigate('/login');
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/dashboard',
      children: [
        { label: 'Index', path: '/dashboard' },
        { label: 'Entrada', path: '/dashboard/entrada' },
        { label: 'Saída', path: '/dashboard/saida' },
        { label: 'Relatório', path: '/dashboard/relatorio' }
      ]
    },
    {
      id: 'credito',
      label: 'Crédito',
      icon: CreditCard,
      path: '/dashboard/credito',
      children: [
        { label: 'Empréstimos', path: '/dashboard/credito' },
        { label: 'FGTS', path: '/dashboard/credito/fgts' },
        { label: 'Consignado', path: '/dashboard/credito/consignado' },
        { label: 'Consórcios', path: '/dashboard/credito/consorcios' },
        { label: 'Veicular', path: '/dashboard/credito/veicular' },
        { label: 'Rural', path: '/dashboard/credito/rural' },
        { label: 'Portabilidade', path: '/dashboard/credito/portabilidade' },
        { label: 'Luz', path: '/dashboard/credito/luz' }
      ]
    },
    {
      id: 'pix',
      label: 'PIX',
      icon: QrCode,
      path: '/dashboard/pix',
      children: [
        { label: 'Transferir/QR', path: '/dashboard/pix' },
        { label: 'Copia e Cola', path: '/dashboard/pix/copiaecola' },
        { label: 'Extrato', path: '/dashboard/pix/extrato' },
        { label: 'Chaves', path: '/dashboard/pix/chaves' },
        { label: 'Dúvidas', path: '/dashboard/pix/duvidas' }
      ]
    }
  ];

  return (
    <div className="w-64 bg-blue-900 shadow-2xl flex flex-col border-r border-blue-700">
      {/* Header */}
      <div className="p-6 border-b border-blue-700 bg-blue-950">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            VSBank
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id} className="space-y-1">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg scale-105'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
            
            {/* Submenu */}
            {item.children && (
              <div className="ml-8 space-y-1">
                {item.children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    className={({ isActive }) =>
                      `block px-3 py-1 text-sm rounded transition-all duration-200 ${
                        isActive
                          ? 'text-white font-medium bg-white/20 px-2 py-1 rounded'
                          : 'text-blue-200 hover:text-white hover:bg-white/10 px-2 py-1 rounded'
                      }`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700 space-y-2 bg-blue-950">
        <NavLink
          to="/dashboard/minha-conta"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          <User className="w-5 h-5 mr-3" />
          Minha Conta
        </NavLink>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 