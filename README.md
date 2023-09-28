# Dindin

O desafio consiste em desenvolver uma API REST para um controle pessoal de gastos. Essa API deve permitir a realização de múltiplas operações, sendo elas: cadastro de usuário, login, detalhamento do usuário logado, edição de usuário, listagem de categorias, listagem de transações, detalhamento de transação, cadastro de transação, edição de transação, exclusão de transação, extrato de transações e filtragem de transações por categoria.


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- **[Git](https://git-scm.com/doc)**
- **[Node.js](https://nodejs.org/en)**
- **[Express](https://expressjs.com/pt-br/)**
- **[nodemon](https://nodemon.io/)**
- **[node-postgres](https://www.npmjs.com/package/pg)**
- **[JWT](https://jwt.io/)**
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**


## ⚠️ Dependências

Antes de começar, você deve ter as seguintes ferramentas instaladas na sua máquina: [Git] ([https://git-scm.com](https://git-scm.com/)), [Node.js] ([https://nodejs.org/en/](https://nodejs.org/en/)). Como complemento, é bom tem um editor de código como o [VSCode] ([https://code.visualstudio.com/](https://code.visualstudio.com/))



## 📥 Installation and usage

```bash
# Clone este repositório

$  git  clone  https://github.com/pmagalhaes2/dindin.git


# Acesse a pasta do projeto pelo terminal

$  cd dindin


# Instale as dependências

$  npm  install


# Rode a aplicação no modo de desenvolvimento

$  npm run dev

```

## 📖 Documentação da API

### Criação de usuário

Cria um novo usuário com base nos dados descritos abaixo recebidos no body da requisição e retorna as informações do usuário, acrescentando o `id` cadastrado e excluindo a `senha`.


    POST /usuario

##### Endpoint:

    http://localhost:3000/usuario

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do cliente |
|  `email` | `string`| Responsável por armazenar o e-mail do cliente  |
|  `senha` | `string`| Responsável por armazenar a senha do cliente  |

---

### Login do usuário

    POST /login

Permite que o usuário cadastrado realize login no sistema e retorna as informações do usuário acrescentando o token de autenticação.

##### Endpoint:

    http://localhost:3000/login


##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
|  `email` | `string`| Responsável por armazenar o e-mail do cliente  |
|  `senha` | `string`| Responsável por armazenar a senha do cliente  |


---


## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. 



### Detalhamento do usuário

    GET /usuario

Retorna os dados do usuário logado de acordo com o `id` presente no token de autenticação.


##### Endpoint:

    http://localhost:3000/usuario

--- 

### Alteração do usuário

    PUT /usuario

Altera os dados do usuário logado baseado nos dados recebidos no body da requisição.

##### Endpoint:

    http://localhost:3000/usuario


##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do cliente |
|  `email` | `string`| Responsável por armazenar o e-mail do cliente  |
|  `senha` | `string`| Responsável por armazenar a senha do cliente  |


---

### Listagem das categorias

    GET /categoria

Retorna a listagem de todas as categorias cadastradas.


##### Endpoint:

    http://localhost:3000/categoria

---

### Listagem das transações

    GET /transacao

Retorna a listagem de todas transações cadastradas para o usuário logado.


##### Endpoint:

    http://localhost:3000/transacao
---

### Detalhamento de transação

    GET /transacao/:id

Retorna transação com base no `id`  da transação recebido como parâmetro de requisição.

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id da transação|


##### Endpoint:

    http://localhost:3000/transacao/:id

---

### Criação de transação

    POST /transacao

Realiza cadastro de transação para o usuário logado baseado nos dados recebidos no body da requisição.

##### Endpoint:

    http://localhost:3000/transacao
    

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `descricao`  | `string` | Responsável por armazenar a descrição da transação |
|  `valor` |  `number`|  Responsável por armazenar o valor da transação |
|  `data` |  `string`|  Responsável por armazenar a data da transação  |
|  `categoria_id` |  `string`|  Responsável por armazenar o id da categoria da transação baseada na tabela `categorias`  |
| `tipo`  | `string` | Responsável por armazenar o tipo da transação, sendo `entrada` ou `saida`

---

### Alteração de transação

    PUT /transacao/:id

Altera os dados da transação para o usuário logado  com base no `id`  da transação recebido como parâmetro de requisição e nos dados recebidos no body da requisição.


| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id da transação|


##### Endpoint:

    http://localhost:3000/transacao/:id
    

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `descricao`  | `string` | Responsável por armazenar a descrição da transação |
|  `valor` |  `number`|  Responsável por armazenar o valor da transação |
|  `data` |  `string`|  Responsável por armazenar a data da transação  |
|  `categoria_id` |  `string`|  Responsável por armazenar o id da categoria da transação baseada na tabela `categorias`  |
| `tipo`  | `string` | Responsável por armazenar o tipo da transação, sendo `entrada` ou `saida`


--- 


### Deleção de transação

    DELETE /transacao/:id

Exclui transação com base no `id`  da transação recebido como parâmetro de requisição.


| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id da transação |


##### Endpoint:

    http://localhost:3000/transacao/:id
  
  ---

###  Extrato de transações

    GET /transacao/extrato

Retorna a soma de todas transações de acordo com o tipo (entrada/saida) para o usuário logado de acordo com o `id` presente no token de autenticação.


##### Endpoint:

    http://localhost:3000/transacao/extrato
---

###  Filtragem de transações por categoria

    GET /transacao

Retorna o filtro de transações baseado no paramêtro do tipo query `filtro` para o usuário logado de acordo com o `id` presente no token de autenticação.

| Parâmetro query | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `filtro`  | `string` | Responsável por armazenar o nome da categoria baseada na tabela `categorias`  |


##### Endpoint:

    http://localhost:3000/transacao

Feito por Patricia Magalhães 💙
