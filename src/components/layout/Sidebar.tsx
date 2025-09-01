import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';
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
  const [expandedItems, setExpandedItems] = useState<string[]>(['home']);

  const handleLogout = () => {
    clear();
    navigate('/login');
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/dashboard',
      children: []
    },
    {
      id: 'credito',
      label: 'Crédito',
      icon: CreditCard,
      path: '/dashboard/credito',
      children: [
        { label: 'Empréstimo', path: '/dashboard/credito' },
        { label: 'Antecipar FGTS', path: '/dashboard/credito/fgts' },
        { label: 'Crédito Consignado', path: '/dashboard/credito/consignado' },
        { label: 'Consórcio', path: '/dashboard/credito/consorcio' },
        { label: 'Crédito Veicular', path: '/dashboard/credito/veicular' },
        { label: 'Crédito Rural', path: '/dashboard/credito/rural' },
        { label: 'Portabilidade', path: '/dashboard/credito/portabilidade' },
        { label: 'Conta de Luz', path: '/dashboard/credito/luz' }
      ]
    },
    {
      id: 'pix',
      label: 'PIX',
      icon: QrCode,
      path: '/dashboard/pix',
      children: [
        { label: 'Transferência', path: '/dashboard/pix' },
        { label: 'QR Code', path: '/dashboard/pix/qr-code' },
        { label: 'Copia e Cola', path: '/dashboard/pix/copiaecola' },
        { label: 'Extrato PIX', path: '/dashboard/pix/extrato' },
        { label: 'Minhas Chaves', path: '/dashboard/pix/chaves' },
        { label: 'Dúvidas', path: '/dashboard/pix/duvidas' }
      ]
    },
    {
      id: 'minha-conta',
      label: 'Minha Conta',
      icon: User,
      path: '/dashboard/minha-conta',
      children: []
    }
  ];

  return (
    <div className="bg-blue-800 shadow-lg w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold text-white">VSBank</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.children.length > 0 ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full flex items-center justify-between p-3 text-left text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {expandedItems.includes(item.id) ? (
                      <span className="text-blue-300">▼</span>
                    ) : (
                      <span className="text-blue-300">▶</span>
                    )}
                  </button>
                  
                  {expandedItems.includes(item.id) && (
                    <ul className="ml-8 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `block p-2 text-sm text-blue-200 hover:text-white hover:bg-blue-700 rounded transition-colors ${
                                isActive ? 'text-white bg-blue-700' : ''
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-700 text-white' : ''
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 text-red-300 hover:bg-red-900 hover:text-red-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 