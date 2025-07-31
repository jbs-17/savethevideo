import { db, initDatabase, client } from './db.js';

async function findVideo(url) {
  try {
    console.log(220292);
    const collection = await db.collection('video');
    let data = {};
    const response = await collection.findOne({"url": url});
    if(!response){
      data.status = false;
      return data
    }
    data.status = true;
    data.data = response;
    return data;
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


export {findVideo};
export default {findVideo};