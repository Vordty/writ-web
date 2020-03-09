const MENU_SCHEMA = (type, actions, item) => {
	const { renameFile, copyFile, deleteFile, createFile, createFolder } = actions;

	const FILE_SCHEMA = [
		{ title: "Copy", action: () => copyFile() },
		{ title: "Rename", action: () => renameFile() },
		{ title: "Delete", action: () => deleteFile() }
	];

	const FOLDER_SCHEMA = [
		{ title: "New File", action: () => createFile() },
		{ title: "New Folder", action: () => createFolder() },
		{ title: "Rename", action: () => renameFile() },
		{ title: "Delete", action: () => deleteFile() }
	];

	const PROJECT_TITLE_SCHEMA = [{ title: "Rename", action: () => console.log("RENAME FILE ACTION") }];

	const getSchema = type => {
		switch (type) {
			case "file":
				return FILE_SCHEMA;
			case "folder":
				return FOLDER_SCHEMA;
			case "projectTitle":
				return PROJECT_TITLE_SCHEMA;
		}
	};

	return getSchema(type);
};

export default MENU_SCHEMA;
