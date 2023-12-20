import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Chichat Backend Api',
      version: '0.1.0',
      description: 'Chat Application with CRUD Api made with express 5-beta',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Chichat',
        url: process.env.BACKEND_DOMAIN,
        email: process.env.NODEMAILER_EMAIL,
      },
    },
    servers: [{ url: process.env.BACKEND_DOMAIN }],
  },
  apis: ['./src/**/*-dto.ts', './src/api/route.ts', './src/api/**/route.ts'],
};

export const specs = swaggerJSDoc(swaggerOptions);
