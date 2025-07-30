import { connectToDatabase } from './db.js';

async function main() {
  let client;
  try {
    // Koneksi ke database
    const { client: dbClient, db } = await connectToDatabase();
    client = dbClient;
    const collection = db.collection('users');

    // **Create**: Tambah satu dokumen
    const insertResult = await collection.insertOne({
      nama: 'Kebo Ijo',
      email: 'kebo@ijo.xyz',
      umur: 25,
    });
    console.log('Inserted document:', insertResult);

    // **Read**: Cari semua dokumen
    const allUsers = await collection.find({}).toArray();
    console.log('All users:', allUsers);

    // **Read**: Cari dokumen berdasarkan kriteria
    const user = await collection.findOne({ nama: 'Kebo Ijo' });
    console.log('Found user:', user);

    // **Update**: Perbarui dokumen
    const updateResult = await collection.updateOne(
      { nama: 'Kebo Ijo' },
      { $set: { umur: 26 } }
    );
    console.log('Updated document:', updateResult);

    // **Delete**: Hapus dokumen
    const deleteResult = await collection.deleteOne({ nama: 'Kebo Ijo' });
    console.log('Deleted document:', deleteResult);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Tutup koneksi
    if (client) await client.close();
    console.log('Connection closed');
  }
}

//main();