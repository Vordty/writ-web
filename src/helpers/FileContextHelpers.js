import { trampoline } from "helpers/Trampoline";

export const sortFiles = fileTree => {
	let fileTreeCopy = fileTree.slice();

	const onlyFolders = fileTreeCopy.filter(file => {
		return file.isFolder;
	});
	onlyFolders.sort((a, b) => a.title.localeCompare(b.title));

	const onlyFiles = fileTreeCopy.filter(file => {
		return !file.isFolder;
	});
	onlyFiles.sort((a, b) => a.title.localeCompare(b.title));

	const combined = onlyFolders.concat(onlyFiles);

	return combined;
};

export const getBranchMembers = (id, fileTree) => {
	const branchMembers = [];

	const branchTopLevelChildren = fileTree.filter(file => file.parentId === id);

	branchTopLevelChildren.map(file => {
		if (file.isFolder) {
			branchMembers.push(file);
			const getFolderChildrenRec = trampoline(getFolderChildren);
			getFolderChildrenRec(file.id, branchMembers, fileTree);
		} else {
			branchMembers.push(file);
		}
	});

	branchMembers.push(fileTree.find(file => file.id === id));

	return branchMembers;
};

const getFolderChildren = (id, container, fileTree) => {
	const folderChildren = fileTree.filter(file => file.parentId === id);

	let funcResult;

	folderChildren.map(file => {
		if (file.isFolder) {
			container.push(file);
			funcResult = () => getFolderChildren(file.id, container, fileTree);
		} else {
			container.push(file);
		}
	});

	return funcResult;
};

export const getFileParent = (file, fileTree) => {
	return fileTree.find(f => f.id === file.parentId);
};

export const getFileParentId = (id, fileTree) => {
	if (!fileTree) return;

	const file = fileTree.find(file => file.id === id);

	return file.parentId;
};

export const getFileLevel = (id, fileTree) => {
	if (!fileTree) return;

	let level = 1;
	let currentFileId = id;

	while (getFileParentId(currentFileId, fileTree) !== -1) {
		currentFileId = getFileParentId(currentFileId, fileTree);
		level++;
	}

	return level;
};
