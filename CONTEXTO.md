# 🍕 GUIA DE DESENVOLVIMENTO: Plataforma de Delivery de Comida

![Status](https://img.shields.io/badge/status-planejamento-blue)
![Arquitetura](https://img.shields.io/badge/arquitetura-simplificada%20(monorepo)-green)
![Foco](https://img.shields.io/badge/foco-manutenibilidade%20e%20desenvolvimento%20r%C3%A1pido-orange)

> Este documento serve como um **Guia de Desenvolvimento Completo** para a criação de uma plataforma de delivery de comida (estilo iFood). Ele é estruturado como um **passo a passo detalhado** para orientar tanto o desenvolvedor humano quanto a Inteligência Artificial (IA) em cada etapa do projeto, garantindo consistência e foco na **arquitetura simplificada** e **fácil manutenção**.

## 📋 Índice de Desenvolvimento

O desenvolvimento será dividido em fases claras e sequenciais, garantindo que cada etapa seja concluída antes de avançar para a próxima.

1.  [Fase 0: Definição e Setup Inicial](#fase-0-definição-e-setup-inicial)
2.  [Fase 1: Estrutura de Dados (Banco de Dados)](#fase-1-estrutura-de-dados-banco-de-dados)
3.  [Fase 2: Backend - Módulos Essenciais (Core API)](#fase-2-backend---módulos-essenciais-core-api)
4.  [Fase 3: Frontend - Estrutura e Autenticação](#fase-3-frontend---estrutura-e-autenticação)
5.  [Fase 4: Backend - Módulos de Negócio (Restaurantes e Produtos)](#fase-4-backend---módulos-de-negócio-restaurantes-e-produtos)
6.  [Fase 5: Frontend - Experiência do Cliente (Busca e Menu)](#fase-5-frontend---experiência-do-cliente-busca-e-menu)
7.  [Fase 6: Backend - Módulos de Transação (Carrinho e Pedidos)](#fase-6-backend---módulos-de-transação-carrinho-e-pedidos)
8.  [Fase 7: Frontend - Fluxo de Pedido e Acompanhamento](#fase-7-frontend---fluxo-de-pedido-e-acompanhamento)
9.  [Fase 8: Refinamento, Testes e Documentação](#fase-8-refinamento-testes-e-documentação)
10. [Fase 9: Deploy e Operação](#fase-9-deploy-e-operação)

---

## 🎯 Objetivo do Projeto

Criar uma plataforma de delivery de comida completa, robusta, mas com foco primordial em uma **arquitetura simplificada** (Monorepo com Backend e Frontend desacoplados) para garantir **fácil manutenção** e **rápido desenvolvimento** de novas funcionalidades.

### Tecnologias Sugeridas (Adaptáveis)

Para manter a simplicidade e robustez, sugerimos o seguinte *stack*:

| Componente | Tecnologia Sugerida | Justificativa para Simplicidade |
| :--- | :--- | :--- |
| **Backend** | **Node.js (Express/Fastify) + TypeScript** | Leve, rápido e tipado. Evita a complexidade de *frameworks* muito opinativos. |
| **ORM/BD** | **Prisma + PostgreSQL** | Prisma simplifica a gestão do banco de dados (migrations e queries). PostgreSQL é robusto e gratuito. |
| **Frontend** | **React + Vite + Tailwind CSS** | React é padrão de mercado. Vite para *build* rápido. Tailwind para estilização ágil e consistente. |
| **Estado (FE)** | **Zustand/Jotai** | Gerenciadores de estado minimalistas e de fácil aprendizado, em contraste com Redux. |
| **Containerização** | **Docker e Docker Compose** | Essencial para setup rápido e ambiente de desenvolvimento consistente. |

---

## 1. Fase 0: Definição e Setup Inicial

**Objetivo:** Estabelecer o ambiente de desenvolvimento e a estrutura base do projeto.

| Passo | Descrição Detalhada para a IA | Ferramentas/Comandos |
| :--- | :--- | :--- |
| **0.1** | **Criação do Monorepo:** Inicializar a estrutura de pastas `projeto-delivery/` com subpastas `backend/` e `frontend/`. | `mkdir projeto-delivery && cd projeto-delivery && mkdir backend frontend` |
| **0.2** | **Inicialização do Backend:** Criar um projeto Node.js com TypeScript e instalar dependências básicas (Express/Fastify, dotenv, TypeScript). **Instrução IA:** Criar `tsconfig.json` e o arquivo inicial `src/server.ts` com um servidor Express básico. | `cd backend && npm init -y && npm install express typescript ts-node @types/express dotenv && npx tsc --init` |
| **0.3** | **Inicialização do Frontend:** Criar um projeto React com Vite e TypeScript. Instalar Tailwind CSS. **Instrução IA:** Configurar `tailwind.config.js` e importar o CSS base em `src/index.css`. | `cd ../frontend && npm create vite@latest . -- --template react-ts && npm install -D tailwindcss postcss autoprefixer` |
| **0.4** | **Configuração do Docker:** Criar o arquivo `docker-compose.yml` na raiz do projeto para orquestrar o banco de dados PostgreSQL. **Instrução IA:** O serviço `db` deve ter volumes persistentes e variáveis de ambiente para o banco de dados (DB_USER, DB_PASSWORD, DB_NAME). | `touch docker-compose.yml` (Conteúdo deve definir o serviço `db` com PostgreSQL) |
| **0.5** | **Configuração do ORM (Prisma):** Inicializar o Prisma no `backend/`, configurar o *schema* inicial (usuário) e o *datasource* para PostgreSQL. **Instrução IA:** Garantir que a `DATABASE_URL` no `.env` do backend corresponda ao serviço `db` do Docker Compose. | `cd backend && npx prisma init --datasource-provider postgresql` |
| **0.6** | **Primeira Migration:** Criar o modelo `User` (id, email, password, role) e executar a primeira *migration*. | Editar `prisma/schema.prisma` e rodar `npx prisma migrate dev --name init` |

---

## 2. Fase 1: Estrutura de Dados (Banco de Dados)

**Objetivo:** Definir o *schema* do banco de dados com os modelos essenciais para o negócio.

**Instrução para a IA:** O foco é na simplicidade. Use o Prisma para definir os modelos e seus relacionamentos.

| Módulo | Modelos Essenciais (Prisma Schema) | Relacionamentos Chave |
| :--- | :--- | :--- |
| **Usuários** | `User` (Cliente, Dono de Restaurante, Admin), `Address`. **Instrução IA:** O `enum Role` deve ser definido para o campo `role` em `User`. | `User` 1:N `Address` |
| **Restaurantes** | `Restaurant` (Nome, Categoria, Status, Horário), `Category` | `Restaurant` N:M `Category` (ou 1:N se simplificado) |
| **Menu/Produtos** | `Product` (Nome, Descrição, Preço, Imagem), `ProductCategory` | `Restaurant` 1:N `Product`, `Product` 1:N `ProductCategory` |
| **Pedidos** | `Order` (Status, Total, Endereço de Entrega), `OrderItem` | `User` 1:N `Order`, `Order` 1:N `OrderItem` |
| **Avaliações** | `Review` (Nota, Comentário) | `User` 1:N `Review`, `Restaurant` 1:N `Review` |

**Passo de Execução:** Criar e aplicar todas as *migrations* necessárias para estes modelos.

---

## 3. Fase 2: Backend - Módulos Essenciais (Core API)

**Objetivo:** Implementar a base da API, incluindo autenticação e gestão de usuários.

**Instrução para a IA:** Use JWT para autenticação. Mantenha a estrutura de pastas modular (e.g., `src/modules/auth`, `src/modules/users`).

| Módulo | Funcionalidades (Endpoints) | Tecnologias Chave |
| :--- | :--- | :--- |
| **Auth** | `/auth/register` (POST), `/auth/login` (POST), `/auth/refresh` (POST). **Instrução IA:** Crie o `AuthModule`. O `AuthService` deve conter a lógica para gerar/validar tokens JWT e hashear/comparar senhas com `bcrypt`. O `AuthController` expõe os endpoints. | JWT, Bcrypt (para hash de senha) |
| **Users** | `/users/me` (GET), `/users/me` (PATCH). **Instrução IA:** Crie o `UsersModule`. O `UsersService` interage com o Prisma para buscar e atualizar dados do usuário. O `UsersController` usa um *guard* para proteger as rotas, permitindo acesso apenas a usuários autenticados. | Middleware de autenticação (JWT Guard) |
| **Config** | Configuração de variáveis de ambiente (`.env`) e CORS. | `dotenv`, Middleware CORS |

**Passo de Execução:** Implementar os serviços, *controllers* e *routes* para os módulos `Auth` e `Users`.

**Exemplo de Estrutura de Pasta (Backend):**
```
backend/
└── src/
    ├── modules/
    │   ├── auth/
    │   │   ├── auth.controller.ts
    │   │   ├── auth.service.ts
    │   │   ├── auth.module.ts
    │   │   └── guards/
    │   │       └── jwt.guard.ts
    │   └── users/
    │       ├── users.controller.ts
    │       ├── users.service.ts
    │       └── users.module.ts
    ├── app.module.ts
    └── main.ts
```

---

## 4. Fase 3: Frontend - Estrutura e Autenticação

**Objetivo:** Configurar o roteamento, estilização e o fluxo de login/registro no Frontend.

**Instrução para a IA:** Usar React Router para navegação. Criar componentes reutilizáveis para formulários e layout.

| Componente | Descrição | Tecnologias Chave |
| :--- | :--- | :--- |
| **Layout** | Componentes `Header`, `Footer`, `Layout` principal. | Tailwind CSS |
| **Roteamento** | Rotas públicas (`/login`, `/register`) e rotas privadas (`/home`, `/profile`). | React Router DOM |
| **Serviço API** | Configuração do cliente HTTP (Axios) para comunicação com o Backend. | Axios |
| **Páginas Auth** | Implementação das páginas `Login` e `Register` com formulários. **Instrução IA:** Usar validação de esquema (e.g., Zod) em conjunto com React Hook Form para garantir a tipagem e validação de dados. | React Hook Form (sugerido para simplicidade) |
| **Estado Global** | Armazenamento do token JWT e dados do usuário logado. **Instrução IA:** Criar um *store* de autenticação (`useAuthStore`) que gerencie o estado de login/logout e persista o token no `localStorage` (ou similar) para manter a sessão. | Zustand/Jotai |

**Passo de Execução:** Conectar os formulários de login/registro com os endpoints do Backend.

**Exemplo de Estrutura de Pasta (Frontend):**
```
frontend/
└── src/
    ├── components/
    │   ├── ui/                 # Componentes genéricos (Botão, Input)
    │   └── layout/             # Componentes de layout (Header, Footer)
    ├── pages/
    │   ├── auth/
    │   │   ├── LoginPage.tsx
    │   │   └── RegisterPage.tsx
    │   ├── HomePage.tsx
    │   └── ProfilePage.tsx
    ├── services/               # Funções de API (e.g., api.ts, auth.api.ts)
    ├── store/                  # Stores de estado (e.g., useAuthStore.ts)
    └── App.tsx                 # Configuração do Router
```

---

## 5. Fase 4: Backend - Módulos de Negócio (Restaurantes e Produtos)

**Objetivo:** Implementar a lógica de negócio para a gestão de restaurantes e seus menus.

**Instrução para a IA:** Criar endpoints com proteção de rota (apenas para usuários com *role* `RestaurantOwner` ou `Admin`).

| Módulo | Funcionalidades (Endpoints) | Detalhes de Implementação |
| :--- | :--- | :--- |
| **Restaurants** | CRUD completo (`/restaurants`), Listagem pública (`/restaurants?category=...`). **Instrução IA:** Implementar validação de `role` para o CRUD (apenas `RestaurantOwner` ou `Admin`). A listagem pública deve ser acessível a todos. | Filtros de busca, validação de dados (e.g., horário de funcionamento). |
| **Products** | CRUD de produtos associados a um restaurante (`/restaurants/:id/products`). **Instrução IA:** Garantir que apenas o dono do restaurante possa gerenciar seus produtos. | Gestão de imagens (simplesmente armazenando URLs por enquanto). |

**Passo de Execução:** Implementar a lógica de autorização (verificação de *role* do usuário) nos *controllers*.

---

## 6. Fase 5: Frontend - Experiência do Cliente (Busca e Menu)

**Objetivo:** Criar a interface principal para o cliente: listagem de restaurantes e visualização do menu.

**Instrução para a IA:** Focar na usabilidade e na responsividade (Mobile First).

| Componente | Descrição | Foco |
| :--- | :--- | :--- |
| **Home Page** | Listagem de `Restaurant` com filtros por `Category`. **Instrução IA:** Usar uma biblioteca de *data fetching* (e.g., React Query) para gerenciar o estado de carregamento e cache das listas de restaurantes. | Performance de carregamento e *design* atraente. |
| **Página do Restaurante** | Exibição do `Restaurant` e listagem de `Product` por `ProductCategory`. | Componente de "Adicionar ao Carrinho" em cada produto. |
| **Busca** | Implementação de uma barra de busca que filtra restaurantes em tempo real. **Instrução IA:** Implementar *debounce* para evitar chamadas excessivas à API. | Otimização de *queries* (debounce no Frontend). |

**Passo de Execução:** Conectar as páginas com os endpoints de listagem do Backend.

---

## 7. Fase 6: Backend - Módulos de Transação (Carrinho e Pedidos)

**Objetivo:** Implementar a lógica complexa de carrinho de compras e finalização de pedido.

**Instrução para a IA:** A lógica do carrinho deve ser *stateless* (armazenada no Frontend ou em uma sessão simples) e validada no Backend no momento da criação do pedido.

| Módulo | Funcionalidades (Endpoints) | Lógica de Negócio |
| :--- | :--- | :--- |
| **Orders** | `/orders` (POST - Criar Pedido), `/orders/:id` (GET), `/orders` (GET - Histórico). **Instrução IA:** A criação do pedido deve ser uma transação atômica no banco de dados. | Cálculo de `Total` (Subtotal + Taxa de Entrega). Validação de estoque/disponibilidade. |
| **Status** | `/orders/:id/status` (PATCH - Atualização de Status). **Instrução IA:** Apenas o restaurante ou um `Admin` pode atualizar o status. | Fluxo de status: `Pendente` -> `Em Preparo` -> `A Caminho` -> `Entregue` -> `Cancelado`. |
| **Pagamento** | Simulação de integração com *gateway* de pagamento (apenas registro do método). | Não é necessário integrar com um *gateway* real nesta fase, apenas simular o sucesso. |

**Passo de Execução:** Implementar as transações de banco de dados para garantir a integridade do pedido.

---

## 8. Fase 7: Frontend - Fluxo de Pedido e Acompanhamento

**Objetivo:** Finalizar o fluxo de compra do cliente.

**Instrução para a IA:** Criar uma experiência de usuário clara e segura para a finalização da compra.

| Componente | Descrição | Foco |
| :--- | :--- | :--- |
| **Carrinho** | Componente lateral ou página dedicada para visualização e edição do `OrderItem`. | Cálculo em tempo real do total. |
| **Checkout** | Seleção de `Address`, método de pagamento (simulado) e confirmação final. | Validação de formulário e tratamento de erros da API. |
| **Acompanhamento** | Página de `Order` detalhada com o *status* atual do pedido. **Instrução IA:** Implementar *polling* simples (chamada a cada 10s) para atualizar o status do pedido, mantendo a arquitetura simplificada. | Uso de *polling* simples para atualização de status. |

**Passo de Execução:** Conectar o fluxo de *checkout* com o endpoint `/orders` (POST).

---

## 9. Fase 8: Refinamento, Testes e Documentação

**Objetivo:** Garantir a qualidade do código e a clareza da documentação.

**Instrução para a IA:** Esta é a fase de polimento. A IA deve focar em testes e na geração de documentação técnica.

| Tarefa | Descrição | Ferramentas/Padrões |
| :--- | :--- | :--- |
| **Testes Unitários (Backend)** | Escrever testes para a lógica de negócio mais crítica (e.g., cálculo de pedido, autenticação). | Jest/Vitest. Cobertura mínima de 70%. |
| **Testes E2E (Frontend)** | Testar o fluxo completo de login e criação de pedido. | Cypress/Playwright. |
| **Documentação da API** | Gerar a documentação interativa da API. | Swagger/OpenAPI (se o *framework* permitir, como NestJS ou Fastify com plugins). |
| **Revisão de Código** | Revisão de todos os módulos para garantir a aplicação dos princípios **SOLID** e padrões de código. | ESLint, Prettier. |

**Passo de Execução:** Executar todos os testes e corrigir *bugs* encontrados.

---

## 10. Fase 9: Deploy e Operação

**Objetivo:** Preparar o projeto para ser executado em um ambiente de produção.

**Instrução para a IA:** Focar na configuração de produção e na automação do *deploy*.

| Tarefa | Descrição | Ferramentas/Plataformas |
| :--- | :--- | :--- |
| **Configuração de Produção** | Ajustar variáveis de ambiente (`NODE_ENV=production`, URLs de API). | Arquivo `.env.production` |
| **Build do Frontend** | Gerar a versão otimizada para produção do Frontend. | `npm run build` (Vite) |
| **Containerização Final** | Criar `Dockerfile`s otimizados para o Backend e Frontend. | `Dockerfile.backend`, `Dockerfile.frontend` |
| **CI/CD (Opcional)** | Configurar um fluxo de integração e entrega contínua (e.g., GitHub Actions) para automatizar o *deploy*. | GitHub Actions, Vercel/Netlify (para FE), Railway/Render (para BE/DB) |

**Passo de Execução:** Executar o projeto em modo de produção localmente usando Docker para validação final.

---

## 🚀 Próximos Passos (Roadmap)

Após a conclusão das fases acima, o projeto estará funcional. O *roadmap* futuro pode incluir:

1.  **Notificações:** Integração com serviços de e-mail/SMS para status de pedido.
2.  **2FA:** Implementação de Autenticação de Dois Fatores.
3.  **Admin Dashboard:** Criação de um painel de administração para gestão de usuários e restaurantes.
4.  **Geolocalização:** Cálculo de distância e taxa de entrega baseado na localização.
5.  **WebSockets:** Implementação de comunicação em tempo real para *chat* ou rastreamento de entregador.

---

## 🛠️ Padrões e Convenções

Para garantir a manutenibilidade, siga estas convenções:

-   **Nomenclatura:** Use `camelCase` para variáveis e funções, `PascalCase` para classes e componentes, e `snake_case` para colunas do banco de dados (padrão Prisma).
-   **Commits:** Use o padrão **Conventional Commits** (e.g., `feat: adiciona rota de login`, `fix: corrige bug no carrinho`).
-   **Estrutura:** Mantenha a estrutura modular (`modules/`) no Backend e a separação por responsabilidade (`components/`, `pages/`, `services/`) no Frontend.
-   **Tipagem:** Use TypeScript de forma rigorosa, definindo interfaces e tipos para todos os dados de entrada e saída (DTOs).

---
**FIM DO GUIA**
