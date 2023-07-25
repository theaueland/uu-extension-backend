import { Router, Request, Response, NextFunction } from 'express'

import * as db from '../../postgres/db_test';

const storage_router = Router()

storage_router.get('/buttons', async (_req:Request, res:Response) => {
  res.send({ message: "get the JSON file from the database for buttons" });
});
storage_router.post('/save_buttons', async (req: Request, res: Response, next: NextFunction) => {
  await db.post_json(req.body, res, next);
  if (res.statusCode === 200) {
    res.send({ message: "Successfully saved the JSON data" });
  }
});
storage_router.post('/register_user', async (req: Request, res: Response, next: NextFunction) => {
  await db.post_user(req.body.data, res, next);
  if (res.statusCode === 200) {
    console.log("status: 200 ok");
    res.send({ message: "Successfully registered a new user" });
  }
});

// ---------------------------------------------------------------------------

export { storage_router }
