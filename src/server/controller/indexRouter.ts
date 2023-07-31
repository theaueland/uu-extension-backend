import { Router, Request, Response } from 'express'
const indexRouter = Router()

indexRouter.get('/', (_req:Request, res:Response) => {
  res.send({ message: "index page" });
});
indexRouter.get('/*', (_req:Request, res:Response) => {
  res.send({ message: "Endpoint does not exist" });
});

// ---------------------------------------------------------------------------

export { indexRouter }
