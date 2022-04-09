import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import createConnection from '@shared/infra/typeorm';

createConnection();

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
