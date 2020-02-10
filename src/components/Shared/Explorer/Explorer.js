import React, { useState, useEffect } from "react";

import File from "./File/File";

import "./Explorer.scss";

const Explorer = () => {
	const [fileTree, setFileTree] = useState([
		{ id: 1, title: "Test Folder 1", isFolder: true, parentId: -1, isOpen: false },
		{ id: 2, title: "Test File 1", isFolder: false, parentId: 1, isOpen: false },
		{ id: 3, title: "Test File 2", isFolder: false, parentId: 1, isOpen: false },
		{ id: 4, title: "Test Folder 2", isFolder: true, parentId: 1, isOpen: false },
		{ id: 5, title: "Test File 3", isFolder: false, parentId: 4, isOpen: false }
	]);

	const levelIndentStep = 16;

	const toggleFolder = id => {
		const folderTreeCopy = fileTree;
		const foundItem = folderTreeCopy.find(item => item.id === id);
		const index = folderTreeCopy.indexOf(foundItem);
		foundItem.isOpen = !foundItem.isOpen;
		folderTreeCopy[index] = foundItem;
		setFileTree([...folderTreeCopy]);
	};

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

	const renderFile = ({ title }, level) => {
		return <File className="explorer-file" title={title} level={level} levelIndentStep={levelIndentStep} />;
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
				onClick={toggleFolder}
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
			<div className="project-title">Interstellar</div>
			<div className="explorer-body">{renderExplorerBody()}</div>
		</div>
	);
};

export default Explorer;
