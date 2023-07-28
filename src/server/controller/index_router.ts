import { Router, Request, Response } from 'express'
const index_router = Router()

// TODO: research whether it is better to use regular expressions to match endpoints,
// or what is the best way to organize this file structure.

index_router.get('/', (_req:Request, res:Response) => {
  res.send({ message: "index page" });
});
index_router.get('/*', (_req:Request, res:Response) => {
  res.send({ message: "Endpoint does not exist" });
});

// ---------------------------------------------------------------------------

export { index_router }
