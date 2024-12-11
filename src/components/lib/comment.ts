export async function fetchComments(blog_title: string) {
  const res = await fetch(`/api/comments?blog_title=${encodeURIComponent(blog_title)}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }
  return res.json();
}

export async function addComment(blog_title: string, username: string, comment: string) {
  const res = await fetch(`/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blog_title, username, comment }),
  });
  if (!res.ok) {
    throw new Error("Failed to add comment");
  }
  return res.json();
}