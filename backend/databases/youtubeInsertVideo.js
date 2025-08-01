import { db, initDatabase, client } from "./db.js";

async function youtubeInsertVideo(jsondata) {
    try {
      jsondata.createdAt = new Date();
      jsondata.capped = false;
      
        const collection = db.collection("youtube-video");
        const response = await collection.insertOne(jsondata);
        
        const indexes = await collection.indexes()[0];
        const createdAtIndex = indexes.find(index => index.key && index.key.createdAt);
        console.log({createdAtIndex, indexes});
        if (createdAtIndex) {
            await collection.dropIndex(createdAtIndex.name);
            console.log("Dropped existing index:", createdAtIndex.name);
        }
        
        console.log("Insert successful:", { response });
        return response;
    } catch (err) {
        
            throw err;
  
    }
}

export { youtubeInsertVideo };
