// Import React dependencies.
import React, { useEffect, useRef } from "react";

import { Editor, Range } from "slate";
import { useSlate, ReactEditor } from "slate-react";

import ToolbarButton from "./ToolbarButton/ToolbarButton";

import "./Toolbar.scss";

const HoveringToolbar = ({ isFormatActive, toggleFormat }) => {
	const ref = useRef();
	const editor = useSlate();

	useEffect(() => {
		const el = ref.current;
		const { selection } = editor;

		if (!el) {
			return;
		}

		if (
			!selection ||
			!ReactEditor.isFocused(editor) ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ""
		) {
			el.removeAttribute("style");
			return;
		}

		const domSelection = window.getSelection();
		const domRange = domSelection.getRangeAt(0);
		const rect = domRange.getBoundingClientRect();
		el.style.opacity = 1;
		el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
		el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
	});

	const onButtonClick = (e, format) => {
		e.preventDefault();
		toggleFormat(editor, format);
	};

	return (
		<div className="toolbar-menu-container">
			<div ref={ref} className="toolbar-menu">
				<ToolbarButton
					format="bold"
					icon="format_bold"
					isActive={isFormatActive(editor, "bold")}
					onClick={e => onButtonClick(e, "bold")}
				/>
				<ToolbarButton
					format="italic"
					icon="format_italic"
					isActive={isFormatActive(editor, "italic")}
					onClick={e => onButtonClick(e, "italic")}
				/>
				<ToolbarButton
					format="underline"
					icon="format_underline"
					isActive={isFormatActive(editor, "underline")}
					onClick={e => onButtonClick(e, "underline")}
				/>
			</div>
		</div>
	);
};

export default HoveringToolbar;
