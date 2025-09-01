import React from 'react';
import UnderDevelopment from '../components/ui/UnderDevelopment';
import { 
  Construction, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PiggyBank, 
  FileText, 
  QrCode, 
  HelpCircle,
  CreditCard,
  DollarSign
} from 'lucide-react';

interface UnderDevelopmentPageProps {
  type?: 'default' | 'entrada' | 'saida' | 'relatorio' | 'fgts' | 'consignado' | 'consorcios' | 'veicular' | 'rural' | 'portabilidade' | 'luz' | 'copiaecola' | 'extrato' | 'chaves' | 'duvidas' | 'cartao' | 'investimentos';
}

const UnderDevelopmentPage: React.FC<UnderDevelopmentPageProps> = ({ type = 'default' }) => {
  const getPageConfig = () => {
    switch (type) {
      case 'entrada':
        return {
          title: 'Entrada de Recursos',
          description: 'Acompanhe todas as entradas e receitas da sua conta. Esta funcionalidade permitirá visualizar transferências recebidas, depósitos e outros créditos.',
          icon: <TrendingUp className="w-16 h-16 text-green-600" />,
          estimatedDate: 'Dezembro 2024'
        };
      case 'saida':
        return {
          title: 'Saída de Recursos',
          description: 'Monitore todos os gastos e saídas da sua conta. Visualize pagamentos, transferências enviadas e outros débitos.',
          icon: <TrendingDown className="w-16 h-16 text-red-600" />,
          estimatedDate: 'Dezembro 2024'
        };
      case 'relatorio':
        return {
          title: 'Relatórios Financeiros',
          description: 'Acesse relatórios detalhados sobre sua situação financeira, incluindo extratos, balanços e análises de gastos.',
          icon: <BarChart3 className="w-16 h-16 text-blue-600" />,
          estimatedDate: 'Janeiro 2025'
        };
      case 'fgts':
        return {
          title: 'Empréstimo FGTS',
          description: 'Simule e solicite empréstimos consignados usando seu saldo do FGTS. Condições especiais para funcionários públicos.',
          icon: <PiggyBank className="w-16 h-16 text-green-600" />,
          estimatedDate: 'Janeiro 2025'
        };
      case 'consignado':
        return {
          title: 'Crédito Consignado',
          description: 'Empréstimos com desconto em folha de pagamento. Condições especiais para funcionários públicos e aposentados.',
          icon: <FileText className="w-16 h-16 text-blue-600" />,
          estimatedDate: 'Janeiro 2025'
        };
      case 'consorcios':
        return {
          title: 'Consórcios',
          description: 'Participe de consórcios para adquirir veículos, imóveis e outros bens com condições especiais.',
          icon: <TrendingUp className="w-16 h-16 text-purple-600" />,
          estimatedDate: 'Fevereiro 2025'
        };
      case 'veicular':
        return {
          title: 'Crédito Veicular',
          description: 'Financiamento para compra de veículos novos e usados com as melhores taxas do mercado.',
          icon: <TrendingUp className="w-16 h-16 text-orange-600" />,
          estimatedDate: 'Fevereiro 2025'
        };
      case 'rural':
        return {
          title: 'Crédito Rural',
          description: 'Linhas de crédito especiais para produtores rurais e agricultores.',
          icon: <TrendingUp className="w-16 h-16 text-green-600" />,
          estimatedDate: 'Março 2025'
        };
      case 'portabilidade':
        return {
          title: 'Portabilidade de Crédito',
          description: 'Transfira seus empréstimos para o VSBank e aproveite condições mais vantajosas.',
          icon: <TrendingUp className="w-16 h-16 text-blue-600" />,
          estimatedDate: 'Março 2025'
        };
      case 'luz':
        return {
          title: 'Crédito para Conta de Luz',
          description: 'Empréstimo especial para pagamento de contas de energia elétrica em atraso.',
          icon: <TrendingUp className="w-16 h-16 text-yellow-600" />,
          estimatedDate: 'Abril 2025'
        };
      case 'copiaecola':
        return {
          title: 'PIX Copia e Cola',
          description: 'Gere e cole códigos PIX para transferências rápidas e seguras.',
          icon: <QrCode className="w-16 h-16 text-blue-600" />,
          estimatedDate: 'Dezembro 2024'
        };
      case 'extrato':
        return {
          title: 'Extrato PIX',
          description: 'Visualize o histórico completo de suas transações PIX, incluindo entradas e saídas.',
          icon: <FileText className="w-16 h-16 text-green-600" />,
          estimatedDate: 'Dezembro 2024'
        };
      case 'chaves':
        return {
          title: 'Gerenciar Chaves PIX',
          description: 'Cadastre, edite e gerencie suas chaves PIX (CPF, e-mail, telefone, chave aleatória).',
          icon: <QrCode className="w-16 h-16 text-purple-600" />,
          estimatedDate: 'Janeiro 2025'
        };
      case 'duvidas':
        return {
          title: 'Dúvidas sobre PIX',
          description: 'Tire suas dúvidas sobre o PIX, horários de funcionamento e procedimentos de segurança.',
          icon: <HelpCircle className="w-16 h-16 text-orange-600" />,
          estimatedDate: 'Janeiro 2025'
        };
      case 'cartao':
        return {
          title: 'Cartão de Crédito',
          description: 'Gerencie seu cartão de crédito, visualize faturas, limite disponível e histórico de compras.',
          icon: <CreditCard className="w-16 h-16 text-blue-600" />,
          estimatedDate: 'Fevereiro 2025'
        };
      case 'investimentos':
        return {
          title: 'Investimentos',
          description: 'Aplique seu dinheiro em diferentes modalidades de investimento com as melhores taxas.',
          icon: <DollarSign className="w-16 h-16 text-green-600" />,
          estimatedDate: 'Fevereiro 2025'
        };
      default:
        return {
          title: 'Página em Desenvolvimento',
          description: 'Esta funcionalidade está sendo desenvolvida e estará disponível em breve.',
          icon: <Construction className="w-16 h-16 text-blue-600" />,
          estimatedDate: 'Em breve'
        };
    }
  };

  const config = getPageConfig();

  return <UnderDevelopment {...config} />;
};

export default UnderDevelopmentPage; 