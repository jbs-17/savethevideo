import { db, initDatabase, client } from './db.js';

async function insertUser(userData) {
  try {
    const collection = db.collection('users');
    const response = await collection.insertOne(userData);
    console.log('Insert successful:', { response });
    return response;
  } catch (err) {
    if (err.code === 11000) {
      console.error('Error: Duplicate key (email sudah ada)');
      throw new Error('Email sudah terdaftar');
    } else if (err.name === 'MongoNetworkError') {
      console.error('Error: Jaringan ke MongoDB bermasalah');
      throw new Error('Koneksi ke database gagal');
    } else {
      console.error('Error:', err.message);
      throw err;
    }
  }
}

async function main() {
  try {
    await initDatabase();
    await insertUser({ nama: 'Kebo Ijo', email: 'kebo@ijo.xyz' });
  } catch (err) {
    console.error('Main error:', err.message);
  } finally {
    await client.close(); // Tutup koneksi untuk script sekali jalan
    console.log('Connection closed');
  }
}

main();