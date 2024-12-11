import { connectDb, getDb } from "./db";

export async function fetchComments(blog_title: string) {
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

        const comments = await db
            .collection('comments')
            .find({ blog_title: blog_title })
            .sort({ createdAt: -1 })
            .toArray();

        return comments;

    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Failed to fetch comments");
    }
}

export async function addComment(id: number, username: string, comment: string) {
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

    const newComment = {
      id,
      username,
      comment,
      created_at: new Date(Date.now()).toISOString().split(".")[0] + "Z",
    };

    const result = await db.collection('comments').insertOne(newComment);

    if (result.insertedId) {
      return { success: true, comment: newComment };
    } else {
      throw new Error('Failed to insert comment');
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}