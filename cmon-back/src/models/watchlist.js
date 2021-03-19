import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
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

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;
