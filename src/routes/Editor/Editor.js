import React from "react";

import Sidebar from "../../components/Shared/Sidebar/Sidebar";
import Explorer from "../../components/Shared/Explorer/Explorer";
import ListDraggable from "../../components/List/ListDraggable/ListDraggable";

import "./Editor.scss";

const Editor = () => {
	return (
		<div className="editor">
			<Sidebar header="Explorer">
				<Explorer></Explorer>
			</Sidebar>
			<div className="w-100">
				<div className="pl-4">
					<ListDraggable customStyle="flex-h">
						<div key="tool-1">TOOL 1</div>
						<div key="tool-2">TOOL 2</div>
						<div key="tool-3">TOOL 3</div>
					</ListDraggable>
				</div>
				<div className="opened-files-container pl-4">
					<ListDraggable customStyle="flex-h">
						<div key="file-1">FILE 1</div>
						<div key="file-2">FILE 2</div>
						<div key="file-3">FILE 3</div>
					</ListDraggable>
				</div>
			</div>
		</div>
	);
};

export default Editor;
