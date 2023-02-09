import mongoose from 'mongoose';

import configs from '../configs/env';

// TODO :: Improvement :: create a Mongo Pool

export async function connectMongo() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(configs.mongoUrl);

  console.log('Mongo connected!');

  mongoose.connection.on('error', async (err) => {
    console.log('Mongo Connection Error', err);
  });
}

export async function disconnectMongo() {
  await mongoose.connection.close();

  console.log('Mongo disconnected!');
}
