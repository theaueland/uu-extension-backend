import { Response, NextFunction } from 'express'

import { init_client } from './init_client';

import * as user from './models/user_model';
import * as buttons from './models/buttons_model';

const createHttpError = require('http-errors')

export const post_json = async (data: string, res: Response, next: NextFunction) => {
  const db_client = init_client();
  if (db_client) {
    try {
      db_client.connect();
      await db_client.query(buttons.get_sql_query('post', data));
    }
    catch (error) { console.log("database query failed"); next(error) }
    finally {
      await db_client.end();
    }
  }
  else {
    res.statusCode = 404;
    return (next(createHttpError(404, 'Failed to connect to the database')));
  }
}

export const post_user = async (data: string, res: Response, next: NextFunction) => {
  const db_client = init_client();
  if (db_client) {
    try {
      db_client.connect();
      await db_client.query(user.get_sql_query('post_user', data));
    }
    catch (error) { console.log("database query failed"); next(error) }
    finally {
      await db_client.end();
    }
  }
  else {
    res.statusCode = 404;
    return (next(createHttpError(404, 'Failed to connect to the database')));
  }
}
