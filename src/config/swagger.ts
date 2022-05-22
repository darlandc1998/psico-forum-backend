export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "PsicoForum API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT}`,
      },
    ],
  },
  apis: [`./src/modules/**/routes/*.routes.ts`],
};
