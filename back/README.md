
# API - Monólito de Gerenciamento de Voluntariado (Back-end)

Este repositório contém o back-end do trabalho prático: um monólito em Node.js/Express que gerencia eventos e voluntários, com autenticação JWT e rotas públicas/protegidas.

Visão geral
- Linguagem: JavaScript (ESM)
- Framework: Express
- Banco: MySQL (driver `mysql2`)
- Autenticação: JWT (JSON Web Tokens)

Propósito
- Fornecer API REST para listar, criar, atualizar e excluir eventos; gerenciar voluntários; autenticar usuários e proteger rotas por permissões (role `admin`).

Arquitetura (camadas)
- Controllers: recebem requisições e retornam respostas (pasta `src/controllers`).
- Services: regras de negócio (pasta `src/services`).
- Models: operações SQL genéricas e específicas por tabela (pasta `src/models`).
- Routes: mapeamento de endpoints públicos e protegidos (pasta `src/routes`).
- Middlewares: autenticação/autorizações (pasta `src/middlewares`).

Endpoints principais
- Public (não autenticado)
  - GET /api/ -> health
  - GET /api/public/home -> welcome
  - GET /api/public/events -> listar eventos públicos

- Auth
  - POST /api/auth/register -> cadastrar usuário
  - POST /api/auth/login -> autenticar (retorna token JWT)

- Protected (requer token)
  - GET /api/protected/dashboard -> painel (qualquer usuário autenticado)
  - GET /api/protected/admin -> rota apenas admin
  - POST /api/protected/events -> criar evento (admin)
  - POST /api/protected/events/id -> atualizar evento (admin)
  - DELETE /api/protected/events/:id -> deletar evento (admin)
  - POST /api/protected/dashboard/volunteer -> registrar voluntário (usuário autenticado)

Instalação e execução

1. Pré-requisitos
	- Node.js v16+ (recomendo v18)
	- MySQL ou MariaDB

2. Instalar dependências

	cd back
	npm install

3. Variáveis de ambiente

	Crie um arquivo `.env` na raiz do `back/` com pelo menos:

	JWT_SECRET=segredoSuperSecreto123
	DB_HOST=localhost
	DB_USER=root
	DB_PASSWORD=senha
	DB_DATABASE=nome_do_banco

4. Criar banco e tabelas

	Importe `_db/schema.sql` no seu MySQL:

	mysql -u root -p nome_do_banco < _db/schema.sql

5. Rodar a API

	# desenvolvimento (nodemon)
	npm run dev

	# produção
	npm start

Notes sobre ESM / Node
- O projeto usa módulos ESM (import/export). Garanta que `package.json` contenha:

  "type": "module"

  e que a versão do Node na máquina seja compatível (>=14, preferível >=16/18).

Banco de dados e seeds
- O arquivo `_db/schema.sql` contém a criação das tabelas e exemplos (verifique e ajuste nomes/IDs conforme necessário). É recomendado inserir ao menos um usuário admin e um evento para os testes.

Documentação e JSDoc
- Foram adicionados comentários JSDoc em Controllers, Services e Models para atender ao requisito de documentação de código.
- Recomendo adicionar Swagger (swagger-jsdoc + swagger-ui-express) para gerar a documentação OpenAPI automaticamente.
