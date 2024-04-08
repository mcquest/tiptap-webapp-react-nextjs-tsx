'use client'

import React, { useState } from "react";
import "./styles.scss";
import { Color, ColorOptions } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Define a type that extends TextStyleOptions and includes the types property
interface CustomTextStyleOptions extends TextStyleOptions {
  types?: string[];
}

const MenuBar: React.FC = () => {
  const { editor } = useCurrentEditor();
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

  if (!editor) {
    return null;
  }

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    editor.setOptions({ editable: !isEditMode }); // Toggle editable state of the editor
  };

  const handleSetColor = (color: string) => {
    if (isEditMode) {
      editor.chain().focus().setColor(color).run();
    }
  };

  const handleItalic = () => {
    if (isEditMode) {
      editor.chain().focus().toggleItalic().run();
    }
  };

  return (
    <>
      <button onClick={handleToggleEditMode}>
        {isEditMode ? "Go to Viewer Mode" : "Go to Editor Mode"}
      </button>

      <div />
    Marks:
      
      <button 
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          disabled = {!isEditMode}
      >
        clear marks
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!isEditMode || !editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>

      <button
        onClick={handleItalic}
        disabled={!isEditMode || !editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>

      <button
        onClick={() => handleSetColor("#958DF1")}
        disabled={!isEditMode || !editor.can().chain().focus().setColor("#958DF1").run()}
        className={editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""}
      >
        purple
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!isEditMode || !editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!isEditMode}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      

      <div /> 
     Nodes:
      
      <button 
          onClick={() => editor.chain().focus().clearNodes().run()}
          disabled = {!isEditMode}
      >
        clear nodes
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        disabled = {!isEditMode}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>

      <button
        onClick={()=>editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled = {!isEditMode}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>

      <button
        onClick={()=>editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled= {!isEditMode}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>

      <button
        onClick={()=>editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled = {!isEditMode}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>

      <button
        onClick={()=>editor.chain().focus().toggleHeading({ level: 4 }).run()}
        disabled = {!isEditMode}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>

      <button
        onClick={()=>editor.chain().focus().toggleHeading({ level: 5 }).run()}
        disabled = {!isEditMode}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>

      <button
        onClick={()=>editor.chain().focus().toggleHeading({ level: 6 }).run()}
        disabled = {!isEditMode}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled = {!isEditMode}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled = {!isEditMode}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled = {!isEditMode}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled = {!isEditMode}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>

      <div/>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!isEditMode || !editor.can().chain().focus().undo().run()}
      >
        undo
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!isEditMode || !editor.can().chain().focus().redo().run()}
      >
        redo
      </button>

      <button 
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        disabled = {!isEditMode}
      >
        horizontal rule
      </button>

      <button 
        onClick={() => editor.chain().focus().setHardBreak().run()}
        disabled = {!isEditMode}
      >
        hard break
      </button>
      
    </>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] } as ColorOptions),
  TextStyle.configure({ types: [ListItem.name] } as CustomTextStyleOptions),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

{/*Init text*/}
const content = `
<br>
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. 
  Sure, there are all kinds of basic text styles you’d probably expect from a text editor.
  But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. 
  But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. 
  It’s only the tip of the iceberg though. Give it a try and click a little bit around. 
  Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. You are loved and respected.
  <br />
  — cpu
</blockquote>
`;

const App: React.FC = () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      
    >
    <div />
    </EditorProvider>
  );
};

export default App;
