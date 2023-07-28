import { Client } from 'pg'
require('dotenv').config();

const fs = require('fs');

export const init_client = (): Client | undefined => {
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

  } else {
    return undefined;
  }
}
