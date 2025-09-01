import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Home, 
  CreditCard, 
  QrCode, 
  User, 
  LogOut
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
    <div className="w-64 bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">VSBank</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id} className="space-y-1">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
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
                      `block px-3 py-1 text-sm rounded transition-colors ${
                        isActive
                          ? 'text-primary-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
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
      <div className="p-4 border-t border-gray-200 space-y-2">
        <NavLink
          to="/dashboard/minha-conta"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <User className="w-5 h-5 mr-3" />
          Minha Conta
        </NavLink>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 