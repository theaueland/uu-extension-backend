import { Router, Request, Response, NextFunction } from 'express'

import * as wcagButtons from '../../wcag/models/buttonsModel';

const createHttpError = require('http-errors')

const storageRouter = Router()

storageRouter.get('/buttons', async (_req:Request, res:Response, next: NextFunction) => {
  try {
    await wcagButtons.getJson();
    res.send({ message: "get the JSON file from the database for buttons" });

  } catch (err: unknown) { next(createHttpError(401, err)); }
});
storageRouter.post('/saveButtons', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await wcagButtons.postJson(req.body);
    const responseMessage = "Successfully saved the JSON data: " + req.body;
    res.send({ message: responseMessage });

  } catch (err: unknown) { next(createHttpError(401, err)); }
});
storageRouter.get('/deleteAllButtons', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await wcagButtons.deleteJson();
    const responseMessage = "Deleted all JSON data in buttons_test table";
    res.send({ message: responseMessage });

  } catch (err: unknown) { next(createHttpError(401, err)); }
});

export { storageRouter }
