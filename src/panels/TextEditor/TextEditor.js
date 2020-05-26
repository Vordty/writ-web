// Import React dependencies.
import React, { useEffect, useMemo, useState, useRef } from "react";

import { createEditor, Editor, Transforms, Text, Range } from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";

import Toolbar from "./Toolbar/Toolbar";

import "./TextEditor.scss";

const TextEditor = () => {
	const editor = useMemo(() => withReact(createEditor()), []);

	const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "A line of text in a paragraph." }],
		},
	]);

	const toggleFormat = (editor, format) => {
		const isActive = isFormatActive(editor, format);
		Transforms.setNodes(
			editor,
			{ format: { type: format, isActive: isActive ? false : true } },
			{ match: Text.isText, split: true },
		);
	};

	const isFormatActive = (editor, format) => {
		const [match] = Editor.nodes(editor, {
			match: n => n.format && n.format.type === format && n.format.isActive,
		});
		return !!match;
	};

	const Leaf = ({ attributes, children, leaf }) => {
		if (leaf.format && leaf.format.isActive) {
			if (leaf.format && leaf.format.type === "bold") {
				children = <strong>{children}</strong>;
			}

			if (leaf.italic) {
				children = <em>{children}</em>;
			}

			if (leaf.underlined) {
				children = <u>{children}</u>;
			}
		}

		return <span {...attributes}>{children}</span>;
	};

	return (
		<div className="text-editor-container">
			<div className="text-editor">
				<Slate editor={editor} value={value} onChange={value => setValue(value)}>
					<Toolbar isFormatActive={isFormatActive} toggleFormat={toggleFormat} />
					<Editable
						renderLeaf={props => <Leaf {...props} />}
						onDOMBeforeInput={e => {
							switch (e.inputType) {
								case "formatBold":
									e.preventDefault();
									return toggleFormat(editor, "bold");
								case "formatItalic":
									e.preventDefault();
									return toggleFormat(editor, "italic");
								case "formatUnderline":
									e.preventDefault();
									return toggleFormat(editor, "underline");
								default:
							}
						}}
					/>
				</Slate>
			</div>
		</div>
	);
};

export default TextEditor;
