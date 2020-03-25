import React, { createContext, useState, useEffect } from "react";

import { sortFiles } from "helpers/SortFiles";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
	const [fileTree, setFileTree] = useState([
		{
			id: 1,
			title: "B Test Folder 1",
			isFolder: true,
			parentId: -1,
			level: 1,

			isOpen: false,
			order: null
		},
		{
			id: 40,
			title: "A Test Folder 7",
			isFolder: true,
			parentId: -1,
			level: 1,

			isOpen: false,
			order: null
		},
		{
			id: 2,
			title: "C test_file_1",
			isFolder: false,
			parentId: 1,
			level: 2,

			isOpen: true,
			order: 3
		},
		{
			id: 3,
			title: "B test_file_2",
			isFolder: false,
			parentId: 1,
			level: 2,

			isOpen: true,
			order: 2
		},
		{
			id: 4,
			title: "Test Folder 2",
			isFolder: true,
			parentId: 1,
			level: 2,

			isOpen: false,
			order: null
		},
		{
			id: 5,
			title: "test_file_3",
			isFolder: false,
			parentId: 4,
			level: 3,

			isOpen: false,
			order: 1
		}
	]);

	const getFileTree = () => {
		return sortFiles(fileTree);
	};

	const [displayedFile, setDisplayedFile] = useState({});
	const [renameStateInfo, setRenameStateInfo] = useState({
		isActive: false,
		fileId: null
	});

	const closeFile = id => {
		console.log("CLOSE FILE " + id);

		setFileTree(fileTree.map(file => (file.id === id ? { ...file, isOpen: false } : file)));
	};

	const openFile = id => {
		console.log("OPEN FILE " + id);

		if (isAlreadyOpen(id)) {
			console.log("IS ALREADY OPEN");
			return;
		}

		displayFile(id);
		setFileTree(fileTree.map(file => (file.id === id ? { ...file, isOpen: true } : file)));
	};

	const moveFile = (title, toTitle) => {
		const file = fileTree.find(file => file.title === title);
		let toFile = fileTree.find(file => file.title === toTitle);

		console.log(`Move ${title} to ${toTitle}`);

		if (!toFile.isFolder) {
			console.log("TARGET IS FILE");

			const toFileParent = getFileParent(toFile);
			toFile = toFileParent;
		}

		if ((file.level < toFile.level && file.isFolder) || file.id === toFile.id) return;

		console.log("INFO", file, toFile);
		setFileTree(
			fileTree.map(f => (f.id === file.id ? { ...file, level: toFile.level + 1, parentId: toFile.id } : f))
		);
	};

	const moveFileToRoot = title => {
		console.log("TO ROOT " + title);

		const fileTreeCopy = fileTree.slice();

		for (let file in fileTreeCopy) {
			if (fileTreeCopy[file].title === title) {
				fileTreeCopy[file].level = 1;
				fileTreeCopy[file].parentId = -1;
			}
		}

		setFileTree(fileTreeCopy);
	};

	const renameFile = id => {
		setRenameStateInfo({ isActive: true, fileId: id });
	};

	const changeFileTitle = (id, newTitle) => {
		const fileTreeCopy = fileTree.slice();

		for (let file in fileTreeCopy) {
			if (fileTreeCopy[file].id === id) {
				fileTreeCopy[file].title = newTitle;
			}
		}

		setFileTree(fileTreeCopy);
	};

	const turnOffRenameState = () => {
		setRenameStateInfo({ isActive: false, fileId: null });
	};

	const copyFile = () => {
		console.log("Copy File");
	};

	const deleteFile = () => {
		console.log("Delete File");
	};

	const createFile = () => {
		console.log("Create File");
	};

	const createFolder = () => {
		console.log("Create Folder");
	};

	const displayFile = id => {
		setDisplayedFile(fileTree.find(file => file.id === id));
	};

	const isAlreadyOpen = id => {
		return fileTree.find(file => file.id === id).isOpen;
	};

	const toggleFolder = id => {
		setFileTree(fileTree.map(file => (file.id === id ? { ...file, isOpen: !file.isOpen } : file)));
	};

	const getFileById = id => {
		return fileTree.find(f => f.id === id);
	};

	const getFileOnlyTree = () => {
		return fileTree.filter(file => !file.isFolder);
	};

	const getFileParent = file => {
		return fileTree.find(f => f.id === file.parentId);
	};

	return (
		<FileContext.Provider
			value={{
				getFileTree,
				getFileOnlyTree,
				displayedFile,
				displayFile,
				closeFile,
				toggleFolder,
				openFile,
				moveFile,
				moveFileToRoot,
				renameFile,
				changeFileTitle,
				copyFile,
				deleteFile,
				createFile,
				createFolder,
				renameStateInfo,
				turnOffRenameState
			}}
		>
			{children}
		</FileContext.Provider>
	);
};
