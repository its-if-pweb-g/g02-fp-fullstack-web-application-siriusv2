"use client";
import { useState, useEffect } from "react";
import { addComment, fetchComments } from "../lib/comment";

export default function Comments({ blog_title }: { blog_title: string }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Check authentication and load comments
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch("../api/check-auth", {
          method: "GET",
          credentials: "same-origin",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.message === "Authenticated") {
            setLoggedIn(true);
            setUsername(data.user.username);
          }
        }

        // Fetch comments
        const commentsData = await fetchComments(blog_title);
        setComments(commentsData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Error loading comments or checking authentication.");
      }
    };

    fetchInitialData();
  }, [blog_title]);

  // Add a comment
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(blog_title, username, newComment);
      // Refresh comments
      const updatedComments = await fetchComments(blog_title);
      setComments(updatedComments);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment.");
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form className="addComments" onSubmit={handleAddComment}>
        {loggedIn ? (
          <div>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-white border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
              placeholder="Add your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </div>
        ) : (
          <p>You must be logged in to add a comment.</p>
        )}
      </form>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <strong>{comment.username}</strong>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
