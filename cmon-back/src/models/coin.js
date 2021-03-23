import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: false
  },
  values: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CoinValue' }]
});

const Coin = mongoose.model('Coin', coinSchema);

export default Coin;
