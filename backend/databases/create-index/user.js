import { db } from "../db.js";


try {
  await db.collection('user').createIndexes([
    { key: { username: 1 }, unique: true },
    { key: { email: 1 }, unique: true },
    { key: { phone: 1 }, unique: true },
    { key: { uuid: 1 }, unique: true }])
    console.log('berhasil membuat index');
} catch (error) {
console.log(error);
}

