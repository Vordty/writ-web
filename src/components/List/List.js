import React from "react";

import "./List.scss";

const List = ({ children, ...props }) => {
	return (
		<div {...props} className="list">
			{children}
		</div>
	);
};

export default List;
