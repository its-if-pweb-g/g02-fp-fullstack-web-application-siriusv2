import BlogFeatured from "@/components/blog/BlogFeatured";
import Category from "@/components/blog/Category";

export default function Page() {
  return (
    <div className="landing bg-gradient-to-r from-[#3872be] min-h-screen to-[#bde7ff]">
      <BlogFeatured />
      <Category />
    </div>
  );
}
