# Instruções de execução

## Requisitos para execução

- Node.js [(Última versão LTS)](https://nodejs.org/en/download)
- Docker [(Versão 25.0.3 ou superior)](https://docs.docker.com/desktop/), _certifique-se de estar usando o Docker Compose **V2**_

## Passo a passo

### 1. Clone o repositório

```bash 
git clone https://github.com/vinicivs-rocha/selecao-node-adasi

cd selecao-node-adasi
```
### 2. Instale as dependências

```bash 
npm install
```

### 3. Inicie o banco de dados
Nesta etapa você pode usar um banco de dados próprio ou usar o banco de dados já configurado com o projeto, em um container Docker.

#### 3.1 Usando Docker
Para usar o banco de dados padrão do projeto basta pular para a etapa 5.

#### 3.2 Usando banco de dados próprio

- Crie um banco de dados PostgreSQL
- Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env 
DB_HOST (hostname do banco de dados)
DB_PORT (porta do banco de dados)
DB_USER (usuário do banco de dados)
DB_PASSWORD (senha usuário do banco de dados)
DB_NAME (nome do banco de dados)
DB_MIGRATIONS_TABLE (tabela de migrations, opcional)
```

### 4. Executando as migrations

**Etapa necessária apenas para bancos de dados próprios.**
   
```bash
npm run orm:migrate
```

### 5. Inicie o servidor

```bash 
npm start
```

## Acesse a documentação da API
A documentação da API está disponível em `http://localhost:3000/docs` na forma de Swagger UI.

## Testes

Na interface do [Swagger UI](http://localhost:3000/docs) é possível executar requisições testar as rotas da API. Se preferir, você pode usar o [Postman](https://www.postman.com/downloads/), ou qualquer outro client HTTP, para testar as rotas.

Também é possível executar os testes end-to-end com o comando:

```bash 
npm run test:e2e
```