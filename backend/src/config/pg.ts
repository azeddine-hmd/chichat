import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
    id          bigserial   UNIQUE,
    created_at  timestamptz DEFAULT NOW(),
    payload     bytea
  );
`);

pool.on('error', (err) => {
  console.error('Postgres error', err);
});
