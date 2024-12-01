import BlogFeatured from "@/components/BlogFeatured";
import Category from "@/components/Category";

export default function Page() {
  return (
    <div className="landing bg-gradient-to-r from-[#3872be] min-h-screen to-[#bde7ff]">
      <BlogFeatured />
      <Category />
    </div>
  );
}
