import { Int32 } from "mongodb";
import { connectDb, getDb } from "./db"; // Your database utility to get the database instance

// Fetch comments for a blog post
export async function fetchComments(id: Int32) {
    try {
        await new Promise((resolve: Function, reject: Function) => {
            connectDb((err) => {
              if (err) {
                reject("Error connecting to the database");
              } else {
                resolve();
              }
            });
        });
        const db = getDb();

        // Fetch the comments from MongoDB, sorting by date and limiting the results
        const comments = await db
            .collection('comments')
            .find({ id: id })
            .sort({ createdAt: -1 })
            .toArray();

        return comments;

    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Failed to fetch comments");
    }
}