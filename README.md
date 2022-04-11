# Hello Work | Challenge DNC Group

Projeto desenvolvido com a finalidade de automatização do processo de presenças em um escritório.

É possível acessar a documentação presente no [Swagger](http://localhost:3333/api-docs/) após iniciar o servidor.

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

- Para implementação do usuário administrador, é necessário executar a seed com o comando ```yarn seed```, que irá ler as credenciais presentes no arquivo *.env*, compostas por um CPF fake e uma senha aleatória. 

- Por fim, já é possível iniciar o servidor com o comando ```yarn dev:server``` ou ```npm run dev:server```.

- A mensagem **Server started on port 3333** mostra que o servidor foi iniciado.

