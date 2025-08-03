import { db } from "../db.js";


try {
  const collection = await db.collection('user');
  collection.createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });
  collection.createIndex({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $type: "string" } } });
  collection.createIndex({ uuid: 1 }, { unique: true, partialFilterExpression: { phone: { $type: "string" } } });
  collection.createIndex({ username: 1 }, { unique: true, partialFilterExpression: { phone: { $type: "string" } } });

  console.log('berhasil membuat index');
} catch (error) {
  console.log(error);
}

