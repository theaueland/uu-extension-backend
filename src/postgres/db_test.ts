import {  NextFunction } from 'express'

import { init_client } from './init_client';

import * as user from './models/user_model';
import * as buttons from './models/buttons_model';

const createHttpError = require('http-errors')

export const query = async(method: string, model: string, data: string, next: NextFunction) => {
  const db_client = init_client();
  if (db_client) {
    try {
      db_client.connect();

      switch(model) {
        case 'buttons':
          await db_client.query(buttons.get_sql_query(method, data)); break;

        case 'user':
          await db_client.query(user.get_sql_query(method, data)); break;
        default:
          console.log('Failed to execute database query');
          return next(createHttpError(404, 'Failed to connect to the database'));
      }
    }
    catch (error) { console.log("database query failed"); next(error) }
    finally {
      await db_client.end();
    }
  }
  else {
    return next(createHttpError(404, 'Failed to connect to the database'));
  }
}
