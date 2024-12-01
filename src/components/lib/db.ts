import { MongoClient, Db } from "mongodb";

let db: Db | null = null;

export const connectDb = (cb: (err?: Error | null) => void): void => {
  MongoClient.connect("mongodb+srv://Sirius:Siriusv2@sirius.eypym.mongodb.net")
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