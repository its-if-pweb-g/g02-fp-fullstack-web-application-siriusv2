import { useEffect, useState } from "react";
import {fetchComments} from "../lib/comment";
import HTMLReactParser from "html-react-parser/lib/index";
import { connectDb, getDb } from "../lib/db";

export default async function Comments({blog_title} : {blog_title: string}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch("../../app/api/check-auth", {
          method: "GET",
          credentials: "same-origin",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.message === "Authenticated") {
            setLoggedIn(true);
            setUsername(data.user.username);
          } else {
            setLoggedIn(false);
          }
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
      }
    };

    checkAuthentication();
  }, []);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    await db.collection("comments").insertOne({
      blog_title: blog_title,
      username: username,
      content:newComment,
      created_at: new Date(Date.now()).toISOString().split(".")[0] + "Z",
    });
  };


  try {
    const comments = await fetchComments(blog_title);

    let html = '';

    comments.forEach((comment) => {
      html += `
        <div className="comment">
          <h1 className="text-5xl sm:text-6xl md:text-7xl">${comment.username}</h1>
          <h3 className="text-xl sm:text-2xl" >${new Date(comment.created_at).toLocaleString()}</h3>
          <p>${comment.comment}</p>
        </div>
      `;
    });
    
    return (
      <div>
        <form className="addComments" onSubmit={handleAddComment}>
          {loggedIn ? (<div>Add Comment
            <input
                type="text"
                name="name"
                id="name"
                className="bg-white border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                placeholder="Add your comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          ) : (
            <div>
              <p>You must be logged in to add a comment.</p>
            </div>
          )}
        </form>
        <h1 className="text-5xl sm:text-6xl md:text-7xl">Temporary, will be moved to Comments</h1>
        {HTMLReactParser(html)}
      </div>
    );
  } catch (error) {
      console.error("Error fetching comments:", error);
      return "<p>Error loading comments. Please try again later.</p>";
  }
}
