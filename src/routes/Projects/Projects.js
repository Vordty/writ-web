import React from "react";

import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Input from "../../components/Input/Input";
import Spacer from "../../components/Spacer/Spacer";
import List from "../../components/List/List";
import ProjectItem from "./ProjectItem/ProjectItem";
import Shape from "../../components/Shape/Shape";
import Icon from "../../components/Icon/Icon";

const Projects = () => {
	return (
		<Background pattern="dots">
			<Card style="ghost">
				<div className="mpc-5">
					<Text type="main" customStyle="ft-thin">
						~ WRIT ~
					</Text>
				</div>
				<div className="flex w-100">
					<Input placeholder="Search your project..." />
					<div className="ml-4">
						<Shape type="square">
							<Icon type="plus" />
						</Shape>
					</div>
				</div>
				<Spacer count="20" symbol="~" />
				<List>
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
				</List>
			</Card>
		</Background>
	);
};

export default Projects;
