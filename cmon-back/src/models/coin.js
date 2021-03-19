import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: false
  }
});

const Coin = mongoose.model('Coin', coinSchema);

/*
coinSchema.statics.deleteById = async function (cid, next) {
    c.findById(req.body.company).exec((err, comp) => {
        if (err) {
          next(boom.badImplementation(err));
        }

    bc.save((err, b) => {
      if (err) {
        next(boom.badImplementation(err));
      } else {
        helpers.LOGGER.debug(`blockchain saved to blocks collection.`);
  
        next();
      }
    });
  };
  */

export default Coin;
