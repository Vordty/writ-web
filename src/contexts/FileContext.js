import React, { createContext, useState, useEffect } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
	const [fileTree, setFileTree] = useState([
		{
			id: 1,
			title: "Test Folder 1",
			isFolder: true,
			parentId: -1,
			isOpen: false,
			order: null
		},
		{
			id: 2,
			title: "test_file_1",
			isFolder: false,
			parentId: 1,
			isOpen: true,
			order: 3
		},
		{
			id: 3,
			title: "test_file_2",
			isFolder: false,
			parentId: 1,
			isOpen: true,
			order: 2
		},
		{
			id: 4,
			title: "Test Folder 2",
			isFolder: true,
			parentId: 1,
			isOpen: false,
			order: null
		},
		{ id: 5, title: "test_file_3", isFolder: false, parentId: 4, isOpen: false, order: 1 }
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

	return (
		<FileContext.Provider
			value={{ fileTree, getFileOnlyTree, displayedFile, displayFile, closeFile, openFile, toggleFolder }}
		>
			{children}
		</FileContext.Provider>
	);
};
