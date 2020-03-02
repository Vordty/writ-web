import React, { useState, useContext } from "react";

import File from "./File/File";

import "./Explorer.scss";
import Icon from "../../Icon/Icon";

import { ComponentContext } from "../../../contexts/ComponentContext";
import { FileContext } from "../../../contexts/FileContext";

const Explorer = () => {
	const { onMenuClick } = useContext(ComponentContext);
	const { fileTree, toggleFolder } = useContext(FileContext);

	const levelIndentStep = 20;

	const renderExplorerBody = () => {
		const items = [];
		const level = 1;

		const topLevelFiles = fileTree.filter(item => item.parentId === -1);
		topLevelFiles.map(item => {
			if (item.isFolder) {
				items.push(renderFolder(item, level));
			}
		});

		return items;
	};

	const renderFile = ({ id, title }, level) => {
		return (
			<File
				id={id}
				className="explorer-file"
				title={title}
				level={level}
				levelIndentStep={levelIndentStep}
				key={id}
			/>
		);
	};

	const renderFolder = ({ id, title, isOpen, isFolder }, level) => {
		const folderChildren = fileTree.filter(item => item.parentId === id);

		return (
			<File
				id={id}
				title={title}
				isOpen={isOpen}
				level={level}
				isOpen={isOpen}
				isFolder={isFolder}
				levelIndentStep={levelIndentStep}
				onClick={() => toggleFolder(id)}
				key={id}
			>
				{folderChildren.map(item => {
					const items = [];
					if (item.isFolder) {
						items.push(renderFolder(item, level + 1));
					} else {
						items.push(renderFile(item, level + 1));
					}

					return items;
				})}
			</File>
		);
	};

	return (
		<div className="explorer">
			<div className="project-title">
				<div className="project-title-text">Interstellar</div>
				<Icon type="dot3" onClick={e => onMenuClick(e, "projectTitle")} />
			</div>
			<div className="explorer-body">{renderExplorerBody()}</div>
		</div>
	);
};

export default Explorer;
