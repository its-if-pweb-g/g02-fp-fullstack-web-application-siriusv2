"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import Jodit to ensure client-side rendering
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

export default function RichTextEditor() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    // Memoized configuration for Jodit
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

    // Form submission handler
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // tambahkan sweetalert
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
                        Desciption
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
