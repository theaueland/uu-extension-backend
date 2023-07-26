import { Router, Request, Response, NextFunction } from 'express'

import * as db from '../../postgres/db_test';
import * as buttons from '../../postgres/models/buttons_model';

const createHttpError = require('http-errors')
const storage_router = Router()

storage_router.get('/buttons', async (_req:Request, res:Response, next: NextFunction) => {
  await db.query('get', 'buttons', "", next);
  res.send({ message: "get the JSON file from the database for buttons" });
});
storage_router.post('/save_buttons', async (req: Request, res: Response, next: NextFunction) => {
  if (!buttons.validate_json) {
    return next(createHttpError(404, 'Invalid JSON format'));
  }

  await db.query('post', 'buttons', req.body, next);

  if (res.statusCode === 200) {
    res.send({ message: "Successfully saved the JSON data" });
  }
});
// ----------- Request handlers for the user model (should not be in this file)
storage_router.get('/all_users', async (_req: Request, res: Response, next: NextFunction) => {
  await db.query('get', 'user', '', next);
  if (res.statusCode === 200) {
    res.send({ message: "Returning all users" });
  }
});
storage_router.post('/register_user', async (req: Request, res: Response, next: NextFunction) => {
  await db.query('post', 'user', req.body, next);
  if (res.statusCode === 200) {
    res.send({ message: "Successfully registered a new user" });
  }
});

// ---------------------------------------------------------------------------

export { storage_router }
