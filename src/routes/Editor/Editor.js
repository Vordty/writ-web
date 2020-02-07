import React from "react";

import Sidebar from "../../components/Shared/Sidebar/Sidebar";
import ListDraggable from "../../components/List/ListDraggable/ListDraggable";

import "./Editor.scss";

const Editor = () => {
	return (
		<div className="editor">
			<Sidebar />
			<ListDraggable />
		</div>
	);
};

export default Editor;
