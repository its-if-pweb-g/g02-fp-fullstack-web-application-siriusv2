"use client";
import BlogFeatured from "@/components/blog/BlogFeatured";
import Comment from "../../components/blog/Comments"
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const blogTitle = searchParams.get("blog") || ""; 
  return (
    <div className="landing bg-gradient-to-r from-[#3872be] min-h-screen to-[#bde7ff]">
      <BlogFeatured />
      <Comment blog_title={blogTitle} />
    </div>
  );
}