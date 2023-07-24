import { Response, NextFunction } from 'express'
import { init_client } from './init_client';

const createHttpError = require('http-errors')

const get_sql_query = (query_type: string) => {
  // table users: (email, firstname, lastname, age)
  const select_query = 'SELECT * FROM users;';
  const insert_query = `INSERT INTO users VALUES('alpha.bravo@charlie.net', 'alpha bravo', 20);`;
  const create_query = 'CREATE TABLE users ( email varchar, name varchar, age int );';
  const delete_query = 'DROP TABLE users;';

  switch (query_type){
    case 'get': { return select_query; }
    case 'insert': { return insert_query; }
    case 'create': { return create_query; }
    case 'delete': { return delete_query; }
    default: { return ""; }
  }
}

const save_json = async (data: string, res: Response, next: NextFunction) => {
  const db_client = init_client();
  if (db_client) {
    try {
      db_client.connect();

      const query = get_sql_query('get');
      const result = await db_client.query(query);

      console.log('query: ', query);
      console.log('Result from database query: ', result.rows);
    }
    catch (error) { console.log("database query failed"); next(error) }
    finally {
      await db_client.end();
    }
  }
  else {
    console.log('Failed to connect to the database');
    res.statusCode = 404;
    return (next(createHttpError(404, 'failed to connect to database')));
  }

  console.log('Saving the data: ', data);
}

export { save_json }
