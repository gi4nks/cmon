/* eslint-disable no-useless-constructor */
import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class CoinValue {
  // eslint-disable-next-line no-useless-constructor
  // eslint-disable-next-line no-empty-function
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.CoinValue.find(query, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(200).json(objs);
    });
  }

  static create(req, res, next) {
    helpers.LOGGER.info("post - '/' - called");
    const obj = new models.CoinValue(req.body);

    helpers.LOGGER.info(`object modeled: ${JSON.stringify(obj)}`);
    obj.save((err, o) => {
      if (err) {
        next(boom.badImplementation(err));
      }

      return res.status(200).json(o);
    });
  }

  static modify(req, res, next) {
    helpers.LOGGER.info("post - '/' - called");
    const obj = new models.CoinValue(req.body);

    helpers.LOGGER.info(`object modeled: ${JSON.stringify(obj)}`);
    obj.save((err, o) => {
      if (err) {
        next(boom.badImplementation(err));
      }

      return res.status(200).json(o);
    });
  }

  static delete(req, res, next) {
    helpers.LOGGER.info("delete - '/' - called");
    const cid = req.params.id;

    helpers.LOGGER.info(`cid: ${JSON.stringify(cid)}`);

    models.CoinValue.findByIdAndDelete(cid, (err, o) => {
      helpers.LOGGER.info(`error: ${JSON.stringify(err)}`);
      if (err) {
        next(boom.notFound(err));
        return;
      }

      if (o == null) {
        next(boom.notFound(err));
        return;
      }

      return res.status(200).json(o);
    });
  }
}

export default CoinValue;
