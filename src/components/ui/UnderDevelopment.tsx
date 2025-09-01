import React from 'react';
import Card from './Card';
import Button from './Button';
import { ArrowLeft, Construction, Code, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  estimatedDate?: string;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
  title = "Página em Desenvolvimento",
  description = "Esta funcionalidade está sendo desenvolvida e estará disponível em breve.",
  icon = <Construction className="w-16 h-16 text-blue-600" />,
  estimatedDate
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8">
        <div className="mb-6">
          {icon}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {estimatedDate && (
          <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
            <Clock className="w-4 h-4 mr-2" />
            <span>Previsão: {estimatedDate}</span>
          </div>
        )}
        
        <div className="space-y-3">
          <Button
            onClick={() => navigate(-1)}
            variant="primary"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="w-full"
          >
            Ir para Home
          </Button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center text-xs text-gray-400">
            <Code className="w-3 h-3 mr-1" />
            <span>VSBank - Sistema em Desenvolvimento</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UnderDevelopment; 