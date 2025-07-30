import { db, initDatabase, client } from '../db.js';

async function createUniqueIndex() {
  try {
    await initDatabase();
    const collection = db.collection('formats');
    await collection.createIndex({ url: 1 }, { unique: true });
    console.log('Unique index created on url');
  } catch (err) {
    console.error('Error creating index:', err.message);
    throw err;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

createUniqueIndex();