import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const BASE_URL = "/api";

const app = express();

app.use(cors());
app.use(express.json());

// ...existing code...
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Voluntariado API",
    version: "1.0.0",
    description: "API para gerenciar eventos e voluntários",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor local"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  // aponte para os arquivos que contêm suas anotações JSDoc/YAML (@openapi)
  apis: [
    "./src/swagger/*.js",
    "./src/controllers/*.js",
    "./src/routes/*.js"
  ]
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI at /api/docs (not /api/api/docs)
app.use(`${BASE_URL}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Expose raw swagger JSON for debugging at /api/docs/swagger.json
app.get(`${BASE_URL}/docs/swagger.json`, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
// ...existing code...
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/public`, publicRoutes);
app.use(`${BASE_URL}/protected`, protectedRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API está funcionando!" });
});

app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res
    .status(500)
    .json({ error: "Erro interno do servidor", details: err.message });
});

export default app;
