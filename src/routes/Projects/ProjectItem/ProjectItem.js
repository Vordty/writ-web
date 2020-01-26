import React from "react";

import Button from "../../../components/Button/Button";
import Shape from "../../../components/Shape/Shape";
import Icon from "../../../components/Icon/Icon";

import "./ProjectItem.scss";

const ProjectItem = ({ childre, ...props }) => {
	return (
		<div className="project-item-container">
			<div {...props} className="project-item">
				PROJECT ITEM
			</div>
			<div className="ml-4">
				<Shape type="square">
					<Icon type="x" />
				</Shape>
			</div>
		</div>
	);
};

export default ProjectItem;
