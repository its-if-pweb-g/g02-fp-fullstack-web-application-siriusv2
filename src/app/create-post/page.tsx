"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

export default function RichTextEditor() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const router = useRouter();

    const config = useMemo(
        () => ({
            readonly: false,
            toolbarAdaptive: true,
            height: 400,
            allowResizeX: false,
            buttons: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "eraser",
                "|",
                "ul",
                "ol",
                "|",
                "indent",
                "outdent",
                "|",
                "font",
                "fontsize",
                "brush",
                "|",
                "align",
                "undo",
                "redo",
            ],
            editorClassName: "prose max-w-none",
        }),
        []
    );

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!title.trim()) {
            await showSwalCreate(false, "Please enter a title");
            return;
        }

        if (!content.trim()) {
            await showSwalCreate(false, "Please add some content");
            return;
        }

        try {
            const response = await fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.replace(" ", "_"),
                    desc,
                    content,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                await showSwalCreate(true, "Blogs posted successfully");
                setTitle("");
                setContent("");
                setDesc("");

                router.push("/blog");
            } else {
                const errorData = await response.json();
                await showSwalCreate(
                    false,
                    errorData.error || "Failed to post blogs"
                );
            }
        } catch (error) {
            console.error("Error posting blog:", error);
        }
    };

    return (
        <div className="flex flex-col bg-gradient-to-r from-[#3872be] to-[#bde7ff]">
            <div className="bg-white p-5 sm:mx-auto rounded-md m-5 md:min-w-[850px]">
                <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
                    <h1 className="text-xl md:text-3xl font-semibold">Title</h1>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <h1 className="text-xl md:text-3xl font-semibold">
                        Description
                    </h1>
                    <textarea
                        name="description"
                        id="desc"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={desc}
                        rows={3}
                        placeholder="Enter Description"
                        onChange={(e) => setDesc(e.target.value)}
                    />

                    <h1 className="text-xl md:text-3xl font-semibold">
                        Content
                    </h1>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        onBlur={(newContent) => setContent(newContent)}
                    />

                    <button
                        type="submit"
                        className="w-full sm:w-[150px] text-white duration-300 bg-[#0049AB] hover:bg-[#2081ff] font-medium rounded-lg text-md px-5 py-2.5"
                    >
                        Post It
                    </button>
                </form>
            </div>
        </div>
    );
}
