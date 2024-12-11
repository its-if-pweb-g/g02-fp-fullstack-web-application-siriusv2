"use client";
import BlogFeatured from "@/components/blog/BlogFeatured";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    return (
        <div className="landing bg-gradient-to-r from-[#3872be] min-h-screen to-[#bde7ff]">
            <BlogFeatured />
        </div>
    );
}
