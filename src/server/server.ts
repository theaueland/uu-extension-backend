import express, { Express } from 'express';

import { index_router } from './controller/index_router';
import { storage_router } from './controller/storage_router';

import { error_responder} from './middleware/error_handling';

import { run_test } from '../testing/test';

// ----------------------------------------------------------------------------
const server: Express = express();
const PORT = process.env.PORT || 8080
const createHttpError = require('http-errors')
// ----------------------------------------------------------------------------

server.use(express.json());
server.use('/storage', storage_router);
server.use('/', index_router);

server.use(createHttpError)
server.use(error_responder);

// ----------------------------------------------------------------------------
server.listen(PORT, () => {
  console.log("Server is running on port ", PORT)
});
// ----------------------------------------------------------------------------
//run_test('get');
//run_test('post_users');
run_test('post_json');
//run_test('post_object');
// ----------------------------------------------------------------------------
export { createHttpError }
