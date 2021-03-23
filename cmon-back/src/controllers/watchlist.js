/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-useless-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable no-useless-constructor */
import boom from '@hapi/boom';
import CoinMarketCap from 'coinmarketcap-api';
import CoinGecko from 'coingecko-api';
import helpers from '../helpers';

import models from '../models';

class Watchlist {
  // eslint-disable-next-line no-useless-constructor
  // eslint-disable-next-line no-empty-function

  constructor() {
    const coins = ['XLM', 'XRP', 'ADA'];
    const apiKey = process.env.CMC_APIKEY;
  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    (async () => {
      const CoinGeckoClient = new CoinGecko();
      const data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
        coin_ids: ['ripple', 'stellar', 'cardano', 'holo', 'tron', 'bittorrent', 'pundix', 'reef', 'harmony', 'celer',]
      });
      const _coinList = {};
      const _datacc = data.data.tickers.filter((t) => t.target == 'USD');
      [
        'XRP',
        'XLM',
        'ADA',
        'HOT',
        'TRX',
        'BTT',
        'NPXS',
        'REEF',
        'CELR'

      ].forEach((i) => {
        const _temp = _datacc.filter((t) => t.base == i);
        const _res = _temp.length == 0 ? [] : _temp[0];
        _coinList[i] = _res.last;
      });

      helpers.LOGGER.info(_coinList);

      return res.status(200).json(_coinList);
    })();
    /*
    const query = {};

    models.Coin.find(query, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(objs);
    });
    */
  }

  static getAsset(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");
  }

  static getCoinmarket(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    (async () => {
      const _coinList = {};

      const apiKey = process.env.CMC_APIKEY;
      const client = new CoinMarketCap(apiKey);

      //client.getTickers().then(console.log).catch(console.error);
      //client.getGlobal().then(console.log).catch(console.error);
      client.getQuotes({ symbol: 'ADA,XRP,XLM,HOT,NPXS,REEF,CELR,BTT,DOGE,TRX,ONE,ANKR,DENT,DREP' })
        .then((quotes) => {
          helpers.LOGGER.info('-> ');
          helpers.LOGGER.info(JSON.stringify(quotes));
        })
        .catch(console.error);

      helpers.LOGGER.info(_coinList);

      return res.status(200).json(_coinList);
    })();
    /*
    const query = {};

    models.Coin.find(query, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(objs);
    });
    */
  }

  static pullValues(req, res, next) {
    helpers.LOGGER.info("pull - '/' - called");

    (async () => {
      const query = {};

      // get all coins
      models.Coin.find(query, (err, cs) => {
        if (err) {
          next(boom.badRequest(err));
        }

        helpers.LOGGER.info(`CoinList: ${cs}`);

        const _coinList = {};
        let _coins = '';
        const apiKey = process.env.CMC_APIKEY;
        const client = new CoinMarketCap(apiKey);

        cs.forEach((entry) => {
          helpers.LOGGER.info(`Found ${entry.name}`);

          _coins = _coins.concat(',', entry.name);
        });

        helpers.LOGGER.debug(`Concat ${_coins.substring(1)}`);

        const pullDate = new Date();

        client.getQuotes({ symbol: _coins.substring(1) })
          .then((quotes) => {
            // eslint-disable-next-line no-restricted-syntax
            Object.entries(quotes.data).forEach(([key, value]) => {
              /* helpers.LOGGER.info(`Key ${key} - Value ${JSON.stringify(value)}`);
              */
              // find the coin
              const c = cs.find((t) => t.name === key);
              helpers.LOGGER.debug(`Coin: ${JSON.stringify(c)}`);

              const cv = new models.CoinValue();

              cv.name = key;
              cv.when = pullDate;
              cv.value = value.quote.USD.price;
              cv.assetQuantity = c.amount;
              cv.assetValue = c.amount * cv.value;
              helpers.LOGGER.debug(`CoinValue built: ${JSON.stringify(cv)}`);
              helpers.LOGGER.debug(`Coin found ${JSON.stringify(c)}`);

              cv.save((er, t) => {
                if (er) {
                  next(boom.badRequest(er));
                }
                helpers.LOGGER.debug(`--> ${t}`);

                c.values.unshift(t);

                helpers.LOGGER.debug(`Coin found ${JSON.stringify(c)}`);

                c.save((er1, t1) => {
                  if (er1) {
                    next(boom.badRequest(er1));
                  }
                });
              });

            // here I need to store the value in the coin and save
            });

            return res.sendStatus(200);
          })
          .catch((error) => {
            helpers.LOGGER.info(JSON.stringify(error));
            next(boom.badImplementation(error));
            return;
          });

        helpers.LOGGER.debug(_coinList);
      });
    })();
  }
}

export default Watchlist;
