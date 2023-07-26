import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: [process.env.FRONTEND_DOMAIN],
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  credentials: true,
};
