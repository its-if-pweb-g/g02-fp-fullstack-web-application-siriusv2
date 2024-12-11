"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Cookies from "js-cookie";
import BlogPost from "./BlogContent";
import Comments from "./Comments";
import { MdDelete } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoReturnUpBackOutline } from "react-icons/io5";

interface Blog {
    _id: string;
    title: string;
    description: string;
    content: string;
}

export default function BlogFeatured() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [authAdmin, setAdmin] = useState(false);
    const router = useRouter();

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

    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blog");
            const data: { blogs: Blog[] } = await response.json();
            setBlogs(data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
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
        <div className="mx-16 lg:mx-44 items-center py-14">
            {selectedBlog ? (
                <div className="bg-white p-6 rounded-md">
                    <BlogPost
                        title={selectedBlog.title.replace("_", " ")}
                        content={selectedBlog.content}
                    />

                    <div className="flex gap-5">
                        <button
                            onClick={handleBackClick}
                            className="mt-5 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <IoReturnUpBackOutline />
                            Back to Blogs
                        </button>
                        {authAdmin ? (
                            <button
                                onClick={handleDeleteBlog}
                                className="mt-5 bg-red-500 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                                <MdDelete />
                                Delete this Blog
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mt-16">
                        <Comments
                            title={selectedBlog.title.replace("_", " ")}
                        />
                    </div>
                </div>
            ) : (
                <div className="">
                    <div className="bg-white p-7 rounded-md border-[1.7px] border-gray-800">
                        <h1 className="md:text-4xl pb-10 text-2xl font-bold">
                            Welcome to the Sirius Project V2 – Stay Tuned for
                            Exciting Updates!
                        </h1>
                        <div className="md:flex md:gap-5 md:items-center md:justify-center">
                            <div className="w-1/2">
                                <Image
                                    src={"/blog/front-display.jpg"}
                                    alt="contoh"
                                    width={450}
                                    height={500}
                                    className="rounded-lg hidden md:block"
                                />
                            </div>
                            <div className="md:w-1/2 w-full">
                                <h1 className="font-bold lg:text-2xl mb-4 text-xl">
                                    The Future of Technology: How We're Shaping
                                    Tomorrow
                                </h1>
                                <p>
                                    The Sirius Project V2 is evolving! We're
                                    committed to delivering innovative solutions
                                    and engaging content. Our team is working
                                    hard to bring you exciting new features.
                                    Stay tuned for more!
                                </p>
                                <div className="flex gap-3 my-3">
                                    {authAdmin ? (
                                        <button
                                            onClick={handleCreateClick}
                                            className="flex justify-center items-center transition duration-300 ease-in-out p-3 rounded-lg shadow-lg border-[1.5px] border-blue-400 bg-blue-500 text-white hover:bg-blue-700"
                                        >
                                            <IoIosCreate />
                                            <h1 className="ml-3">
                                                Create Post
                                            </h1>
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {blogs.length > 0 ? (
                        <>
                            <h2 className="text-3xl font-bold my-5">
                                Recent Blogs
                            </h2>
                            <div className="flex flex-wrap justify-center items-center">
                                {blogs.map((blog) => (
                                    <div
                                        key={blog._id}
                                        className="bg-white w-[300px] shadow-md p-5 rounded-lg cursor-pointer hover:shadow-lg m-2 border-[1.5px] border-gray-800"
                                        onClick={() => {
                                            handleBlogClick(blog);
                                        }}
                                    >
                                        <h3 className="text-xl font-bold">
                                            {blog.title.replace("_", " ")}
                                        </h3>
                                        <p className="text-gray-600 text-xs">
                                            {blog.description.length > 50
                                                ? `${blog.description.slice(
                                                      0,
                                                      150
                                                  )}...`
                                                : blog.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
}
