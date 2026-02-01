"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, List, ListOrdered, Undo, Redo } from "lucide-react";

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = "Start typing..." }: TiptapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4",
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 border-b bg-muted/50">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={` text-white p-2 rounded hover:bg-muted ${editor.isActive("bold") ? "border rounded-full bg-black font-black" : ""
                        }`}
                    type="button"
                >
                    <Bold className="size-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive("italic") ? "bg-muted" : ""
                        }`}
                    type="button"
                >
                    <Italic className="size-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive("underline") ? "bg-muted" : ""
                        }`}
                    type="button"
                >
                    <span className="font-bold underline text-sm">U</span>
                </button>
                <div className="w-px h-6 bg-border" />
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive("bulletList") ? "bg-muted" : ""
                        }`}
                    type="button"
                >
                    <List className="size-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-muted ${editor.isActive("orderedList") ? "bg-muted" : ""
                        }`}
                    type="button"
                >
                    <ListOrdered className="size-4" />
                </button>
                <div className="w-px h-6 bg-border" />
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className="p-2 rounded hover:bg-muted"
                    type="button"
                >
                    <Undo className="size-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    className="p-2 rounded hover:bg-muted"
                    type="button"
                >
                    <Redo className="size-4" />
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
}