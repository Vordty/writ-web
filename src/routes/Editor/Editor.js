import React from "react";

import Sidebar from "components/Shared/Sidebar/Sidebar";
import Explorer from "panels/Explorer/Explorer";
import OpenedFiles from "panels/OpenedFiles/OpenedFiles";
import TextEditor from "panels/TextEditor/TextEditor";

import ListDraggable from "components/List/ListDraggable/ListDraggable";

import "./Editor.scss";

const Editor = () => {
	return (
		<div className="editor">
			<Sidebar header="Explorer">
				<Explorer></Explorer>
			</Sidebar>
			<div className="w-100 flex-v">
				<div className="pl-4 tools-container">
					<ListDraggable>
						<div key="tool-1">TOOL 1</div>
						<div key="tool-2">TOOL 2</div>
						<div key="tool-3">TOOL 3</div>
					</ListDraggable>
				</div>
				<OpenedFiles />
				<TextEditor />
			</div>
		</div>
	);
};

export default Editor;
