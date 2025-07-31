import { db, initDatabase, client } from './db.js';

async function insertVideo(jsondata) {
  try {
    const collection = db.collection('video');
    const response = await collection.insertOne(jsondata);
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


export default {insertVideo}
export {insertVideo}