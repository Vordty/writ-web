import React, { createContext, useState, useEffect } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
	const [fileTree, setFileTree] = useState([
		{
			id: 1,
			title: "Test Folder 1",
			isFolder: true,
			parentId: -1,
			level: 0,

			isOpen: false,
			order: null
		},
		{
			id: 2,
			title: "test_file_1",
			isFolder: false,
			parentId: 1,
			level: 1,

			isOpen: true,
			order: 3
		},
		{
			id: 3,
			title: "test_file_2",
			isFolder: false,
			parentId: 1,
			level: 1,

			isOpen: true,
			order: 2
		},
		{
			id: 4,
			title: "Test Folder 2",
			isFolder: true,
			parentId: 1,
			level: 1,

			isOpen: false,
			order: null
		},
		{ id: 5, title: "test_file_3", isFolder: false, parentId: 4, level: 2, isOpen: false, order: 1 }
	]);

	const [displayedFile, setDisplayedFile] = useState({});

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
			fileTree.map(f => (f.id === file.id ? { ...file, level: toFile.level, parentId: toFile.id } : f))
		);
	};

	const moveFileToRoot = title => {
		console.log("TO ROOT " + title);
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

	const getFileOnlyTree = () => {
		return fileTree.filter(file => !file.isFolder);
	};

	const getFileParent = file => {
		return fileTree.find(f => f.id === file.parentId);
	};

	return (
		<FileContext.Provider
			value={{
				fileTree,
				getFileOnlyTree,
				displayedFile,
				displayFile,
				closeFile,
				openFile,
				moveFile,
				moveFileToRoot,
				toggleFolder
			}}
		>
			{children}
		</FileContext.Provider>
	);
};
