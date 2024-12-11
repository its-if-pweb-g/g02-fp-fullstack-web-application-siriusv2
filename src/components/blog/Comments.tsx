import { Int32 } from "mongodb";
import {fetchComments} from "../lib/comment";

export default async function Comments({id} : {id: Int32}) {
  try {
    // Fetch the comments for the provided id (e.g., blog post ID)
    const comments = await fetchComments(id);

    // Initialize an empty string to store the HTML content
    let html = '';

    // Iterate over the fetched comments and generate HTML
    comments.forEach((comment) => {
      html += `
        <comment>
          <username>${comment.username}</username><br/>
          <date>${new Date(comment.createdAt).toLocaleString()}</date><br/>
          <content>${comment.comment}</content>
        </comment>
      `;
    });
    
    return (
      <div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl">Temporary, will be moved to Comments</h1>
        <div className="commentContainer" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );

  } catch (error) {
      console.error("Error fetching comments:", error);
      return "<p>Error loading comments. Please try again later.</p>";
  }
}
