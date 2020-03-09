import React, { useState, useContext } from "react";

import File from "./File/File";
import ListDraggable from "../../List/ListDraggable/ListDraggable";

import "./Explorer.scss";
import Icon from "../../Icon/Icon";

import { ComponentContext } from "../../../contexts/ComponentContext";
import { FileContext } from "../../../contexts/FileContext";

const Explorer = () => {
	const { onMenuClick } = useContext(ComponentContext);
	const { fileTree, toggleFolder, moveFile, moveFileToRoot } = useContext(FileContext);

	const levelIndentStep = 20;

	let startTarget;
	const onDragStart = e => {
		e.persist();
		console.log("ON DRAG EVENT", e);

		startTarget = e.target;
	};

	const onDragOver = e => {
		e.preventDefault();
	};

	const onDrop = (e, isRoot) => {
		e.persist();
		e.preventDefault();

		console.log("ON DROP", e);

		if (e.target.className === "explorer-body") {
			moveFileToRoot(startTarget.innerText);
		} else {
			moveFile(startTarget.innerText, e.target.innerText);
		}
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

	const renderFile = ({ id, title }, level) => {
		return <File draggable key={id} id={id} title={title} level={level} levelIndentStep={levelIndentStep} />;
	};

	const renderFolder = ({ id, title, isOpen, isFolder }, level) => {
		const folderChildren = fileTree.filter(item => item.parentId === id);

		return (
			<File
				draggable
				key={id}
				id={id}
				title={title}
				isOpen={isOpen}
				level={level}
				isOpen={isOpen}
				isFolder={isFolder}
				levelIndentStep={levelIndentStep}
				onClick={() => toggleFolder(id)}
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
			<div className="explorer-body" onDragOver={onDragOver} onDrop={onDrop} onDragStart={onDragStart}>
				{renderExplorerBody()}
			</div>
		</div>
	);
};

export default Explorer;
