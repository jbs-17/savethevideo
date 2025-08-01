import { db, initDatabase, client } from "../db.js";

async function createUniqueIndex() {
    try {
        await initDatabase();
        db.createCollection("youtube_video", {
            capped: false,
            expireAfterSeconds: 300 // Dokumen akan dihapus setelah 1 jam
        });
        
    } catch (err) {
        console.error("Error creating index:", err.message);
        throw err;
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

createUniqueIndex();
