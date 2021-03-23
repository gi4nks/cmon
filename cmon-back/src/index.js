import 'dotenv/config';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import helmet from 'helmet';

import helpers from './helpers';
import middlewares from './middlewares';
import routes from './routes';

import datas from './data';

import models from './models';
import { connectDb } from './models';

const app = express();

app.use(helmet());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.use('/', express.static(__dirname + '/public'));
*/

/* Own middlewares */

/* Own APIs */
app.use('/api/v1/coins', routes.coin);
app.use('/api/v1/coinvalues', routes.coinvalue);
app.use('/api/v1/watchlist', routes.watchlist);

// Application global error handler
app.use(middlewares.errorHandler);

// erasing the db at start
const eraseDatabaseOnSync = false;
const feedDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.Coin.deleteMany({}),
    ]);
  }

  if (feedDatabaseOnSync) {
    await Promise.all([
      models.Coin.insertMany(datas.coinData)
    ]);
  }


  app.listen(process.env.PORT, () => helpers.LOGGER.info(`Cmon is listening on port ${process.env.PORT}!`));
});
