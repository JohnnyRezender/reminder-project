# Reminder

### 💻 Sobre o projeto

Reminder é uma API para cadastro e notificações de lembretes via Telegram. 
Este projeto tem o objetivo de iniciar um estudo referente as tecnologias nele utilizas.

### 🚀 Como executar o projeto

Podemos considerar este projeto como sendo divido em duas partes:
  1. Back End (pasta server) 
  2. Front End (pasta web) 🚧 Em construção 🚧

💡O Front End irá precisar que o Back End esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, é preciso ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/JohnnyRezender/reminder-project

# Acesse a pasta do projeto no terminal/cmd
$ cd reminder-project

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute as migrations
$ npm run knex:migrate

# Execute as seeds
$ npm run knex:seed

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333 
```
