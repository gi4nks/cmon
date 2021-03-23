/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

import Coin from './coin';
import CoinValue from './coinvalue';

const mongod = new MongoMemoryServer();

const connectDb = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  await mongoose.connect(uri, mongooseOpts);
};

const closeDb = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDb = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

const models = { Coin, CoinValue };

export { connectDb, closeDb, clearDb };

export default models;
