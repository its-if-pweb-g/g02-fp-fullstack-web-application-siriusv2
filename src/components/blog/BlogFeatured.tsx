"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Cookies from "js-cookie";
import BlogPost from "./BlogContent";
import Comments from "./Comments";

// Tipe data Blog
interface Blog {
    _id: string;
    title: string;
    description: string;
    content: string;
}

export default function BlogFeatured() {
    const [blogs, setBlogs] = useState<Blog[]>([]); // State dengan tipe Blog[]
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null); // State untuk blog yang dipilih
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

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blog");
                const data: { blogs: Blog[] } = await response.json(); // Tipe untuk data yang diterima
                setBlogs(data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const handleBlogClick = (blog: Blog) => {
        setSelectedBlog(blog); // Simpan blog yang dipilih
        router.push(
            `?blog=${encodeURIComponent(blog.title.replace("_", " "))}`
        ); // Update query
    };

    const handleBackClick = () => {
        setSelectedBlog(null); // Kembali ke daftar blog
        router.push("/blog"); // Reset query
    };

    // Fungsi untuk mengonversi HTML ke teks menggunakan DOMParser
    const convertHtmlToText = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
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

    return (
        <div className="mx-16 lg:mx-44 items-center mb-10">
            {/* Tampilkan Blog yang Dipilih */}
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

                    <Comments title={selectedBlog.title.replace("_", " ")} />
                </div>
            ) : (
                // Tampilkan Daftar Blog
                <div className="">
                    <h1 className="md:text-5xl py-10 text-2xl font-bold">
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
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="flex gap-3 my-3">
                                <button className="transition duration-300 ease-in-out p-3 rounded-lg shadow-lg">
                                    Read more
                                </button>
                                <button
                                    onClick={handleCreateClick}
                                    className="transition duration-300 ease-in-out p-3 rounded-lg shadow-lg bg-blue-500 text-white hover:bg-blue-700"
                                >
                                    Create Post
                                </button>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-5">Recent Blogs</h2>
                    <div className="grid gap-5">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white shadow-md p-5 rounded-lg cursor-pointer hover:shadow-lg"
                                onClick={() => {
                                    handleBlogClick(blog);
                                }} // Klik untuk melihat detail blog
                            >
                                <h3 className="text-xl font-bold">
                                    {blog.title.replace("_", " ")}
                                </h3>
                                <p className="text-gray-600">
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
