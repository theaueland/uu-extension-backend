import { Router, Request, Response, NextFunction } from 'express'

import { save_json } from '../../postgres/db_test';

const storage_router = Router()

storage_router.get('/buttons', async (_req:Request, res:Response) => {
  res.send({ message: "get the JSON file from the database for buttons" });
});
storage_router.post('/save_buttons', async (req: Request, res: Response, next: NextFunction) => {
  console.log("(endpoint: /storage/buttons): req.body: ", req.body);

  await save_json(req.body, res, next);
  if (res.statusCode === 200) {
    console.log("status: 200 ok");
    res.send({ message: "save the JSON file in the database for buttons" });
  }
  console.log('Leaving storage post request handler');
});

// ---------------------------------------------------------------------------

export { storage_router }
