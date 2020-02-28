import React from "react";

import "./ContextMenuItem.scss";

const ContextMenuItem = ({ children, onClick }) => {
	return (
		<div onClick={onClick} className="context-menu-item">
			{children}
		</div>
	);
};

export default ContextMenuItem;
