import mongoose from 'mongoose';

const coinValueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  assetQuantity: {
    type: Number,
    required: true
  },
  assetValue: {
    type: Number,
    required: true
  }
});

const CoinValue = mongoose.model('CoinValue', coinValueSchema);

export default CoinValue;
