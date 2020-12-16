import jwt from 'express-jwt';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';
import { loggerWrite } from './util';
import { errorHandler } from './middlewares';
import apiRouter from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors());

if (process.env.NODE_ENV != 'development') {
  app.use(morgan(process.env.LOGGER_LEVEL as string, { stream: loggerWrite }));
}

//FIXME: Colocar autenticaceo novamente
/* app.use(
  jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
  }).unless({
    path: ['/api', '/api/admin/signin', '/api/admin/signup'],
  })
); */

//TODO: Colocar o decode JWT do express
/* app.use('/', (req, res) => {
  return res.status(200).json('OK');
}); */

app.use('/api', apiRouter);

app.all('*', async (req, res) => {
  res.status(404).send('Endereço não encontrado.');
});

app.use(errorHandler);

export { app };
