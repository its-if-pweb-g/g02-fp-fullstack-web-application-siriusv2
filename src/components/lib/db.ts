import { MongoClient, Db } from "mongodb";

let db: Db | null = null;

export const connectDb = (cb: (err?: Error | null) => void): void => {
  MongoClient.connect("mongodb://Sirius:Siriusv2@sirius-shard-00-00.eypym.mongodb.net:27017,sirius-shard-00-01.eypym.mongodb.net:27017,sirius-shard-00-02.eypym.mongodb.net:27017/?ssl=true&replicaSet=atlas-ti5k9g-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Sirius")
    .then((client) => {
      db = client.db();
      cb(null);
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
      cb(err);
    });
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Please call connectDb first.");
  }
  return db;
};
