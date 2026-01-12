import express from "express";
import driversRouter from "./routes/driver.js";
import teamsRouter from "./routes/team.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();
const baseAPIRoute = "/api/v1";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());
app.use(baseAPIRoute + "/drivers", driversRouter);
app.use(baseAPIRoute + "/teams", teamsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "F1 2023 API is running",
    version: "v1",
    basePath: "/api/v1",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});
