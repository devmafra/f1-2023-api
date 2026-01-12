# 🏎️ API Fórmula 1 2023

API RESTful desenvolvida em **Node.js** para gerenciar e consultar dados da temporada de **2023 da Fórmula 1**.

O projeto permite:

- CRUD completo de pilotos
- Visualização da classificação de pilotos
- Classificação de construtores (equipes)
- Documentação interativa com Swagger

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Joi](https://joi.dev/) – Validação de dados
- [Swagger](https://swagger.io/) – Documentação da API

---

## 🌐 API Online (Produção)

A API está disponível em produção:

https://f1-2023-api.onrender.com

### 📄 Documentação Swagger

- Produção:  
  https://f1-2023-api.onrender.com/api-docs
- Local:  
  http://localhost:3000/api-docs

---

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js v18+

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/devmafra/f1-2023-api.git
   cd f1-2023-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

   O servidor estará rodando em:

   ```
   http://localhost:3000
   ```

---

## 📍 Endpoints

A URL base da API é:

```
/api/v1
```

---

### 🏎️ Pilotos (Drivers)

| Método   | Rota                           | Descrição                                   |
| -------- | ------------------------------ | ------------------------------------------- |
| `GET`    | `/drivers`                     | Lista todos os pilotos ordenados por pontos |
| `GET`    | `/drivers/:id`                 | Retorna um piloto específico pelo ID        |
| `GET`    | `/drivers/standings/:position` | Retorna o piloto por posição no ranking     |
| `POST`   | `/drivers`                     | Cadastra um novo piloto                     |
| `PUT`    | `/drivers/:id`                 | Atualiza os dados de um piloto              |
| `DELETE` | `/drivers/:id`                 | Remove um piloto                            |

#### Exemplo de Body (POST / PUT)

```json
{
  "name": "Nome do Piloto",
  "team": "Nome da Equipe",
  "points": 0
}
```

---

### 🏆 Equipes (Teams)

| Método | Rota                         | Descrição                                   |
| ------ | ---------------------------- | ------------------------------------------- |
| `GET`  | `/teams`                     | Classificação do campeonato de construtores |
| `GET`  | `/teams/standings/:position` | Retorna a equipe por posição no ranking     |

---

## 🛠️ Estrutura do Projeto

```bash
.
├── app.js
├── data.js
├── inputValidation.js
├── routes/
│   ├── driver.js
│   └── team.js
├── swagger.js
└── package.json
```

---

## ⚠️ Observações Técnicas

- Os dados são mantidos **em memória** (sem banco de dados)
- Ideal para fins educacionais e demonstração de API REST
- Validações são feitas com Joi
- Ordenação automática baseada em pontuação

---

## 📌 Próximos passos (ideias de evolução)

- Persistência com banco de dados (PostgreSQL ou MongoDB)
- Autenticação JWT
- Paginação e filtros
- Versionamento avançado da API

---

## 👨‍💻 Autor

Desenvolvido por **Davi Mafra**
