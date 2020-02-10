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
						<div>TOOL 1</div>
						<div>TOOL 2</div>
						<div>TOOL 3</div>
					</ListDraggable>
				</div>
				<div className="opened-files-container pl-4">
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
