import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Fórmula 1 2023",
      version: "1.0.0",
      description:
        "API RESTful para gerenciamento de pilotos e classificação da Fórmula 1 2023",
    },
    servers: [
      {
        url: "https://f1-2023-api.onrender.com/api/v1",
        description: "Servidor produção (Render)",
      },
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export default swaggerJsdoc(options);
