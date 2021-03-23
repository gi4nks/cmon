import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }]
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;
