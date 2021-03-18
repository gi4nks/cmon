import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: Date,
    required: false
  },
  amount: {
    type: Number,
    required: false
  }
});

const Coin = mongoose.model('Coin', coinSchema);

export default Coin;
