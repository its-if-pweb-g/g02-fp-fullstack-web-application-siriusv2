import BlogFeatured from "@/components/blog/BlogFeatured";
import Comment from "../../components/blog/Comments"

export default function Page() {
  return (
    <div className="landing bg-gradient-to-r from-[#3872be] min-h-screen to-[#bde7ff]">
      <BlogFeatured />
      <Comment blog_title={"Coba"} />
    </div>
  );
}