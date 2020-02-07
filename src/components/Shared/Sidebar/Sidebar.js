import React from "react";

import Resizable from "../../Resizable/Resizable";

import "./Sidebar.scss";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar-options">
				<div className="sidebar-option">ITEM 1</div>
				<div className="sidebar-option">ITEM 1</div>
				<div className="sidebar-option">ITEM 1</div>
			</div>
			<Resizable customStyle="sidebar-content" />
		</div>
	);
};

export default Sidebar;
