import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

export const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Profile-administrator-app",
      description: "Documentacion de la Api",
      version: "1.0.0",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Ruta",
    },
  ],
  //apis: ['./src/modules/**/*.routes.ts']
  apis: ["./src/modules/**/*.routes.ts"],
});
