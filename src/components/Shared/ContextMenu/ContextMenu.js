import React from "react";

import "./ContextMenu.scss";

const ContextMenu = ({ items, style, menuRef }) => {
	return (
		<div className="context-menu" ref={menuRef}>
			{items()}
		</div>
	);
};

export default ContextMenu;
