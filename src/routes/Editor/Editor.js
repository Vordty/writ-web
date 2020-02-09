import React from "react";

import Sidebar from "../../components/Shared/Sidebar/Sidebar";
import ListDraggable from "../../components/List/ListDraggable/ListDraggable";

import "./Editor.scss";

const Editor = () => {
	return (
		<div className="editor">
			<Sidebar />
			<div className="w-100">
				<ListDraggable customStyle="flex-h">
					<div>TOOL 1</div>
					<div>TOOL 2</div>
					<div>TOOL 3</div>
				</ListDraggable>
				<div className="opened-files-container">
					<ListDraggable customStyle="flex-h">
						<div>FILE 1</div>
						<div>FILE 2</div>
						<div>FILE 3</div>
					</ListDraggable>
				</div>
			</div>
		</div>
	);
};

export default Editor;
