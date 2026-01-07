# API Fórmula 1 2023

Uma API RESTful desenvolvida em Node.js para gerenciar e consultar dados da temporada de 2023 da Fórmula 1. O projeto permite o gerenciamento de pilotos (CRUD) e a visualização da classificação de pilotos e construtores (equipes).

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Joi](https://joi.dev/) (Validação de dados)

## 📦 Instalação e Execução

1. Certifique-se de ter o Node.js instalado.
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node app.js
   ```
   O servidor estará rodando em `http://localhost:3000` (ou `http://0.0.0.0:3000`).

## 📍 Endpoints

A URL base da API é `/api/v1`.

### 🏎️ Pilotos (Drivers)

| Método   | Rota                           | Descrição                                                |
| -------- | ------------------------------ | -------------------------------------------------------- |
| `GET`    | `/drivers`                     | Retorna a lista de todos os pilotos ordenada por pontos. |
| `GET`    | `/drivers/:id`                 | Retorna os dados de um piloto específico pelo ID.        |
| `GET`    | `/drivers/standings/:position` | Retorna o piloto na posição especificada do ranking.     |
| `POST`   | `/drivers`                     | Cadastra um novo piloto.                                 |
| `PUT`    | `/drivers/:id`                 | Atualiza os dados de um piloto existente.                |
| `DELETE` | `/drivers/:id`                 | Remove um piloto.                                        |

#### Exemplo de Corpo (Body) para POST/PUT:

```json
{
  "name": "Nome do Piloto",
  "team": "Nome da Equipe",
  "points": 0
}
```

### 🏆 Equipes (Teams)

| Método | Rota                         | Descrição                                                                                       |
| ------ | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`  | `/teams`                     | Retorna a classificação do campeonato de construtores (soma dos pontos dos pilotos por equipe). |
| `GET`  | `/teams/standings/:position` | Retorna a equipe na posição especificada do ranking de construtores.                            |

## 🛠️ Estrutura do Projeto

- **app.js**: Ponto de entrada da aplicação. Configura o servidor Express e as rotas.
- **routes/**: Contém as definições de rotas para `driver.js` e `team.js`.
- **data.js**: Contém os dados iniciais (em memória) e funções auxiliares de ordenação.
- **inputValidation.js**: Schemas de validação utilizando a biblioteca Joi.
