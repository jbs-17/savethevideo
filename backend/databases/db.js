import { MongoClient } from 'mongodb';
import config from '../configs/config.js';

const uri = config.MONGODB_URI;
const client = new MongoClient(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 15000,
});
let db;

async function initDatabase() {
  try {
    await client.connect();
    db = client.db('savethevideo');
    console.log('Database initialized');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    throw err;
  }
}
initDatabase()
export { db, initDatabase, client };