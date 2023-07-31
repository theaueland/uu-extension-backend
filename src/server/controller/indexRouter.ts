import { Router, Request, Response } from 'express'
import { retrieveComputedProperties } from './computedPropertiesService';
import { ComputedProperty } from './computatedPropInterface';
import { error_responder, server_error } from '../middleware/errorHandling';

const indexRouter = Router()

indexRouter.get('/', (_req:Request, res:Response) => {
  res.send({ message: "index page" });
});
indexRouter.get('/*', (_req:Request, res:Response) => {
  res.send({ message: "Endpoint does not exist" });
});


indexRouter.post('/computedProperties', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    const computedProperties: ComputedProperty[] = await retrieveComputedProperties(url);

    // Respond to the client with JSON format containing computed properties
    res.json(computedProperties);
  } catch (error) {
    if (error instanceof server_error) {
      return error_responder(error, req, res);
    } else {
      console.error('An unexpected error occurred:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
});


export { indexRouter }
