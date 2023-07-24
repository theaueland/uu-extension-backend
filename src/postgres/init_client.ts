import { Client } from 'pg'
require('dotenv').config();

const fs = require('fs');

const init_client = (): Client | undefined => {
  console.log(
   'user: ', process.env.DB_USER,
   ' host: ', process.env.DB_HOST,
   ' database: ', process.env.DB_DATABASE,
   ' password: ', process.env.DB_PASSWORD,
   ' port: ', process.env.DB_PORT,
  );
  if (process.env.DB_USER &&
      process.env.DB_HOST &&
      process.env.DB_DATABASE &&
      process.env.DB_PASSWORD &&
      process.env.DB_PORT) {


    console.log('Connecting to database...');

    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: +process.env.DB_PORT
    })

    console.log('Successfully connected to database');
    return client;

  } else {
    return undefined;
  }
}

const init_database = (): number | undefined => {
  console.log('Initializing database');
  if (!init_client) { return undefined; }

  const sql_script = 'scripts/uu_extension/create_tables.sql';

  fs.readFile(sql_script, 'utf8', (err: Error, data: string) => {
  if (err){ console.log('an error occured: ', err); return undefined; }
    console.log('data: ', data);
  });

  return 0;
}

export { init_client, init_database }
