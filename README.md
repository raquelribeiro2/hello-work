# Hello Work | Challenge DNC Group

Projeto desenvolvido com a finalidade de automatização do processo de presenças em um escritório.

O sistema possui níveis de permissões, onde um usuário do grupo *admin* pode Cadastrar, Listar, Editar e Deletar presenças e o usuário do grupo *user* possui permissão de apenas Cadastrar uma presença para ele mesmo, após se autenticar com Login - seu próprio CPF - e senha.


## Iniciando a aplicação

- Após fazer o clone do projeto, execute ```yarn``` ou ```npm install``` para instalar todas as dependências necessárias para que o projeto funcione.
- Agora os arquivos com variáveis ambiente (*.env*) e de conexão com o banco de dados (*ormconfig.json*) devem ser criados na raiz do projeto.
- Você pode executar os seguintes comandos para copiar os arquivos de exemplo com as informações necessárias para configuração.
```
cp ormconfig.example.json ormconfig.json

cp .env.example .env
```

- Ou pode criá-los manualmente pela interface gráfica e adicionar o seguinte conteúdo em cada um deles:

**.env**
```env
# Application
APP_SECRET=hello-work

APP_WEB_URL=http://localhost:3000
APP_API_URL=http://localhost:3333

# Admin User
USER_ADMIN_PASSWORD=0c16a9d5af7c3ad9d22b0e4cfa03fe27
USER_ADMIN_DOCUMENT=37579824019

```

**ormconfig.json**
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your-username",
  "password": "your-password",
  "database": "hello-work",
 "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}

```

- Também é necessário que um banco de dados PostgreSQL seja criado.

- Com isso, as migrations poderão ser executadas para que as tabelas sejam criadas no banco de dados. Para isso, utilize o comando abaixo:

```bash
yarn typeorm migration:run

# ou

npm typeorm migration:run
```

### Implementação do usuário administrador

- Para implementação deste usuário, é necessário executar duas seeds, sendo uma de criação de módulos do sistema e outra para criação do usuário *admin* e suas permissões em cada módulo. O script irá ler as credenciais presentes no arquivo *.env*, compostas por um CPF fake e uma senha aleatória. 

```bash
yarn seed:modules

yarn seed:admin
```

- Por fim, já é possível iniciar o servidor com o comando ```yarn dev:server``` ou ```npm run dev:server```.

- A mensagem **Server started on port 3333** mostra que o servidor foi iniciado.


## Documentação

É possível acessar a documentação presente no [Swagger](http://localhost:3333/api-docs/) após iniciar o servidor.


## Testes

A aplicação possui 100% de cobertura de testes unitários realizados com Jest.

- Com o comando ```yarn test``` ou ```npm run test``` executa-se todos os testes presentes.

