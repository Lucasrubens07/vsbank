# 🏦 VSBank - Sistema Bancário Digital

Sistema bancário digital completo desenvolvido em React com foco em UX clara e responsividade desktop-first.

## 🌟 Funcionalidades

### 🔐 Autenticação Segura
- Login com email/CPF e senha
- Autenticação de 2 fatores (2FA)
- Registro de novos usuários
- Gerenciamento de sessão

### 🏠 Dashboard Principal
- Visualização de dados da conta
- Saldo disponível e movimentações
- Serviços rápidos (depósito, saque, recarga)
- Extrato de transações (15 dias)
- Resumo financeiro (7 dias)

### 💳 Produtos de Crédito
- Simulação de empréstimos (até R$ 50k)
- Antecipação de FGTS
- Crédito consignado
- Outros produtos (consórcios, veicular, rural, etc.)

### 📱 PIX Completo
- Transferências PIX
- Geração de QR Code
- Copia e cola
- Extrato PIX
- Gerenciamento de chaves
- FAQ e dúvidas

### 👤 Perfil do Usuário
- Informações pessoais
- Configurações de segurança
- Preferências de notificação
- Logout seguro

## 🛠️ Stack Tecnológica

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Estilização**: Tailwind CSS
- **Roteamento**: React Router DOM
- **Estado Global**: Zustand
- **Queries**: React Query (TanStack Query)
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React
- **Containerização**: Docker + Docker Compose

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- npm ou yarn

### Desenvolvimento Local

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd vsbank
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:5173
```

### Com Docker

1. **Desenvolvimento**
```bash
docker-compose up vsbank-dev
```

2. **Produção**
```bash
docker-compose up vsbank
```

3. **Build da imagem**
```bash
docker build -t vsbank .
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── layout/         # Layout e navegação
├── pages/              # Páginas da aplicação
├── stores/             # Stores Zustand
├── types/              # Tipos TypeScript
├── utils/              # Utilitários
├── hooks/              # Hooks customizados
├── services/           # Serviços e APIs
└── routes/             # Configuração de rotas
```

## 🗺️ Mapa de Rotas

### Rotas Públicas
- `/login` - Página de login
- `/register` - Página de registro

### Rotas Protegidas
- `/twofa` - Autenticação 2FA (requer preToken)
- `/dashboard` - Dashboard principal
  - `/dashboard/credito` - Produtos de crédito
  - `/dashboard/pix` - Funcionalidades PIX
  - `/dashboard/minha-conta` - Perfil do usuário

## 🔒 Contratos de API (Mocks)

### Autenticação
```typescript
// POST /auth/login
{
  identifier: string; // email ou CPF
  password: string;
}

// POST /auth/2fa
{
  code: string; // 6 dígitos
}
```

### Conta
```typescript
// GET /account/me
{
  id: string;
  name: string;
  email: string;
  cpf: string;
}

// GET /account/summary
{
  account: {
    id: string;
    accountNumber: string;
    balance: number;
    availableBalance: number;
  };
  user: User;
}
```

### Transações
```typescript
// GET /transactions?days=7
Transaction[] = {
  id: string;
  type: 'IN' | 'OUT' | 'PIX';
  amount: number;
  description: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}[]
```

## 🎨 Design System

### Cores
- **Primary**: Azul (#3B82F6)
- **Success**: Verde (#22C55E)
- **Warning**: Amarelo (#F59E0B)
- **Error**: Vermelho (#EF4444)

### Componentes
- `.btn-primary` - Botão principal
- `.btn-secondary` - Botão secundário
- `.btn-danger` - Botão de perigo
- `.input-field` - Campo de entrada
- `.card` - Card de conteúdo

## 🧪 Testes

### Validação Manual - Etapa 0

1. **Setup do Projeto**
   - ✅ Projeto criado com Vite + React + TS
   - ✅ Tailwind CSS configurado
   - ✅ Todas as dependências instaladas
   - ✅ Estrutura de pastas criada

2. **Autenticação**
   - ✅ Store Zustand funcionando
   - ✅ Páginas de login, registro e 2FA criadas
   - ✅ Rotas protegidas configuradas

3. **Layout**
   - ✅ Sidebar com navegação
   - ✅ Dashboard layout responsivo
   - ✅ Páginas base com placeholders

4. **Docker**
   - ✅ Dockerfile configurado
   - ✅ Docker Compose para dev/prod
   - ✅ Nginx configurado para SPA

### Como Testar

1. **Execute o projeto**
```bash
npm run dev
```

2. **Teste o fluxo de autenticação**
   - Acesse `/login`
   - Digite qualquer email/senha
   - Deve redirecionar para `/twofa`
   - Digite qualquer código de 6 dígitos
   - Deve redirecionar para `/dashboard`

3. **Teste a navegação**
   - Sidebar deve mostrar todos os menus
   - Navegação entre páginas deve funcionar
   - Logout deve limpar dados e redirecionar

4. **Teste responsividade**
   - Layout deve funcionar em diferentes tamanhos de tela
   - Sidebar deve ser responsiva

## 📝 Próximos Passos

- [ ] Implementar MSW para mocks de API
- [ ] Adicionar React Query para gerenciamento de estado
- [ ] Implementar formulários com React Hook Form + Zod
- [ ] Criar componentes de UI reutilizáveis
- [ ] Implementar funcionalidades PIX completas
- [ ] Adicionar testes automatizados
- [ ] Implementar PWA features

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

**VSBank Team** - Sistema bancário digital moderno e seguro.
