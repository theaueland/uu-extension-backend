import { Router, Request, Response, NextFunction } from 'express'

import * as buttons from '../../postgres/models/buttons_model';

const createHttpError = require('http-errors')

const storage_router = Router()

storage_router.get('/buttons', async (_req:Request, res:Response, _next: NextFunction) => {
  await buttons.get_json();
  res.send({ message: "get the JSON file from the database for buttons" });
});
storage_router.post('/save_buttons', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await buttons.post_json(req.body);
    const response_message = "Successfully saved the JSON data: " + req.body;
    res.send({ message: response_message });

  } catch (err: unknown) { next(createHttpError(401, err)); }
});
storage_router.get('/delete_all_buttons', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await buttons.delete_json();
    const response_message = "Deleted all JSON data in buttons_test table";
    res.send({ message: response_message });

  } catch (err: unknown) { next(createHttpError(401, err)); }
});

export { storage_router }
