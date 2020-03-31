const MENU_SCHEMA = (type, actions, item, callback) => {
	const { renameFile, copyFile, pasteFile, deleteFile, deleteFolder, createFile, createFolder } = actions;

	const FILE_SCHEMA = [
		{
			title: "Copy",
			action: () => {
				copyFile(item);
				callback();
			}
		},
		{
			title: "Rename",
			action: () => {
				renameFile(item);
				callback();
			}
		},
		{
			title: "Delete",
			action: () => {
				deleteFile(item);
				callback();
			}
		}
	];

	const FOLDER_SCHEMA = [
		{
			title: "New File",
			action: () => {
				createFile(item);
				callback();
			}
		},
		{
			title: "New Folder",
			action: () => {
				createFolder(item);
				callback();
			}
		},
		{
			title: "Copy",
			action: () => {
				copyFile(item);
				callback();
			}
		},
		{
			title: "Paste",
			action: () => {
				pasteFile(item);
				callback();
			}
		},
		{
			title: "Rename",
			action: () => {
				renameFile(item);
				callback();
			}
		},
		{
			title: "Delete",
			action: () => {
				deleteFolder(item);
				callback();
			}
		}
	];

	const FILE_ROOT_SCHEMA = [
		{
			title: "New File",
			action: () => {
				createFile(item);
				callback();
			}
		},
		{
			title: "New Folder",
			action: () => {
				createFolder(item);
				callback();
			}
		}
	];

	const PROJECT_TITLE_SCHEMA = [{ title: "Rename", action: () => console.log("RENAME FILE ACTION") }];

	const getSchema = type => {
		switch (type) {
			case "file":
				return FILE_SCHEMA;
			case "folder":
				return FOLDER_SCHEMA;
			case "root":
				return FILE_ROOT_SCHEMA;
			case "projectTitle":
				return PROJECT_TITLE_SCHEMA;
		}
	};

	return getSchema(type);
};

export default MENU_SCHEMA;
