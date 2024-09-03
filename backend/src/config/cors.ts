import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: [process.env.BACKEND_DOMAIN, process.env.FRONTEND_DOMAIN],
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
  credentials: true,
};
