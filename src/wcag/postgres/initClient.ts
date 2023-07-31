import { Client } from 'pg'
require('dotenv').config();

const fs = require('fs');

// TODO: I can probably delete this file, using error handling on the
// process environment variable in addition to the client connect function
// call in '/postgres/utils.ts' is probably redundant
export const initClient = (): Client | undefined => {
  if (process.env.DB_USER &&
      process.env.DB_HOST &&
      process.env.DB_DATABASE &&
      process.env.DB_PORT) {

    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: +process.env.DB_PORT
    })

    return client;

  } else { return undefined; }
}
