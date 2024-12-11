"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Cookies from "js-cookie";
import BlogPost from "./BlogContent";
import Comments from "./Comments";
import { IoIosCreate } from "react-icons/io";

interface Blog {
    _id: string;
    title: string;
    description: string;
    content: string;
}

const showSwalCreate = (status: boolean, mess: string) => {
    return withReactContent(Swal)
        .fire({
            text: mess,
            icon: status ? "success" : "error",
            title: status ? "Success" : "Error",
            confirmButtonText: "OK",
        })
        .then((result) => {
            if (result.isConfirmed) {
            }
        });
};

export default function BlogFeatured() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [authAdmin, setAdmin] = useState(false);
    const router = useRouter();

    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blog");
            const data: { blogs: Blog[] } = await response.json();
            setBlogs(data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleBlogClick = (blog: Blog) => {
        setSelectedBlog(blog);
        router.push(`?blog=${encodeURIComponent(blog.title)}`);
    };

    const handleBackClick = () => {
        setSelectedBlog(null);
        router.push("/blog");
    };

    const handleCreateClick = async () => {
        const token = Cookies.get("token");
        if (!token) {
            showSwalCreate(false, "You need to login first!");
            router.push("/login");
        } else {
            try {
                const resAdmin = await fetch("/api/check-admin", {});
                const res = await resAdmin.json();

                if (res.message === "Unauthorized") {
                    await showSwalCreate(false, res.message);
                    return;
                } else if (res.message === "Authenticated") {
                    await showSwalCreate(true, res.message);
                    router.push("/create-post");
                } else {
                    await showSwalCreate(
                        false,
                        "Error during authentication check"
                    );
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleDeleteBlog = async () => {
        const title = selectedBlog?.title;
        if (!title) {
            await showSwalCreate(false, "Blog doesn't exist");
        } else {
            try {
                const resDelete = await fetch("/api/blog", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title }),
                });

                const res = await resDelete.json();

                if (res.message === "Blog Deleted") {
                    await showSwalCreate(true, res.message);
                    setSelectedBlog(null);

                    await fetchBlogs();
                    router.push("/blog");
                } else {
                    await showSwalCreate(false, "Error during blog deletion");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const adminCheck = async () => {
            const token = Cookies.get("token");
            if (token) {
                try {
                    const resAdmin = await fetch("/api/check-admin", {});
                    const res = await resAdmin.json();

                    if (res.message === "Authenticated") {
                        setAdmin(true);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };

        adminCheck();
        fetchBlogs();
    }, []);

    return (
        <div className="mx-16 lg:mx-44 items-center">
            {selectedBlog ? (
                <div className="">
                    <BlogPost
                        title={selectedBlog.title.replace("_", " ")}
                        content={selectedBlog.content}
                    />
                    {/* Mengonversi konten HTML menjadi teks */}
                    <button
                        onClick={handleBackClick}
                        className="mt-5 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                        Back to Blogs
                    </button>
                    {authAdmin ? (
                        <button
                            onClick={handleDeleteBlog}
                            className="mt-5 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Delete this Blog
                        </button>
                    ) : (
                        ""
                    )}

                    <Comments title={selectedBlog.title.replace("_", " ")} />
                </div>
            ) : (
                <div className="pt-5">
                    <div className="bg-white p-7 rounded-xl border-[1.5px] border-gray-800">
                        <h1 className="pb-10 text-2xl font-bold md:text-5xl text-gray-800">
                            This is the Sirius project V2. Stay tuned!!
                        </h1>
                        <div className="md:flex md:gap-5 md:items-center md:justify-center">
                            <div className="w-1/2">
                                <Image
                                    src={"/blog/contoh.jpeg"}
                                    alt="contoh"
                                    width={450}
                                    height={500}
                                    className="rounded-lg hidden md:block"
                                />
                            </div>
                            <div className="md:w-1/2 w-full">
                                <h1 className="font-bold lg:text-2xl mb-4 text-xl">
                                    Exploring New Horizons: What's Next for
                                    Sirius?
                                </h1>
                                <p>
                                    The Sirius Project V2 is evolving! We're
                                    committed to delivering innovative solutions
                                    and engaging content. Our team is working
                                    hard to bring you exciting new features.
                                    Stay tuned for more!
                                </p>
                                <div className="flex gap-3 my-3">
                                    <button
                                        onClick={handleCreateClick}
                                        className="flex flex-row justify-center items-center transition duration-300 ease-in-out p-3 rounded-lg shadow-lg bg-blue-500 hover:bg-blue-700 hover:text-black"
                                    >
                                        <IoIosCreate className="mr-2" />
                                        <h2 className="">Create Post</h2>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold my-5">Recent Blogs</h2>
                    <div className="flex flex-wrap justify-center items-center">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white shadow-md p-5 m-3 rounded-lg w-[300px] h-[100px] cursor-pointer hover:shadow-lg border-[1.5px] border-gray-800"
                                onClick={() => {
                                    handleBlogClick(blog);
                                }} // Klik untuk melihat detail blog
                            >
                                <h3 className="font-bold text-xl">
                                    {blog.title.replace("_", " ")}
                                </h3>
                                <p className="text-gray-600 text-xs">
                                    {blog.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
