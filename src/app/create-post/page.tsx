"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";
import HTMLParser from "html-react-parser";

// Dynamically import Jodit to ensure client-side rendering
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

export default function RichTextEditor() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

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
                "link",
                "image",
                "video",
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
            events: {
                afterInit: (editorInstance: any) => {
                    editorInstance.e.on("errorMessage", (message: string) => {
                        toast.error(`Editor Error: ${message}`);
                    });
                },
            },
        }),
        []
    );

    // Form submission handler
    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Basic validation
        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        if (!content.trim()) {
            toast.error("Please add some content");
            return;
        }

        // Perform submission logic here
        toast.success("Post submitted successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Toast notifications */}
            <Toaster position="top-right" />

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

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

            {/* Preview Section */}
            {content && (
                <div className="mt-6 border-t pt-4">
                    <div className="prose max-w-none">
                        {HTMLParser(content)}
                    </div>
                </div>
            )}
        </div>
    );
}
