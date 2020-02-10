import React from "react";

import "./File.scss";

const File = ({ title, level, levelIndentStep }) => {
	return (
		<div className="file" style={{ paddingLeft: `${level * levelIndentStep}px` }}>
			{title}
		</div>
	);
};

export default File;
