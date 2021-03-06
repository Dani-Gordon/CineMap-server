import express from 'express';
import cors from 'cors';
import { port } from './config/environment.js';
import router from './config/router.js';
import { connectToDb } from './db/helpers.js';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use('/api', router);

async function runServer() {
  console.log('connecting');
  await connectToDb();
  console.log('connected');
  app.listen(port, () => console.log('app is listening on port ' + port));
}

runServer();
