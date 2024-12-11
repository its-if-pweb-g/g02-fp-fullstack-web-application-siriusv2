import { Int32 } from "mongodb";
import {fetchComments} from "../lib/comment";
import HTMLReactParser from "html-react-parser/lib/index";

export default async function Comments({id} : {id: number}) {
  try {
    // Fetch the comments for the provided id (e.g., blog post ID)
    const comments = await fetchComments(id);

    // Initialize an empty string to store the HTML content
    let html = '';

    // Iterate over the fetched comments and generate HTML
    comments.forEach((comment) => {
      html += `
        <div className="comment">
          <h1 className="text-5xl sm:text-6xl md:text-7xl">${comment.username}</h1>
          <h3 className="text-xl sm:text-2xl" >${new Date(comment.createdAt).toLocaleString()}</h3>
          <p>${comment.comment}</p>
        </div>
      `;
    });
    
    return (
      <div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl">Temporary, will be moved to Comments</h1>
        {HTMLReactParser(html)}
      </div>
    );

  } catch (error) {
      console.error("Error fetching comments:", error);
      return "<p>Error loading comments. Please try again later.</p>";
  }
}
