const MENU_SCHEMA = type => {
  switch (type) {
    case "file":
      return FILE_SCHEMA;
    case "folder":
      return FOLDER_SCHEMA;
    case "projectTitle":
      return PROJECT_TITLE_SCHEMA;
  }
};

const FILE_SCHEMA = [
  { title: "Open", action: () => console.log("OPEN FILE ACTION") },
  { title: "Rename", action: () => console.log("RENAME FILE ACTION") },
  { title: "Delete", action: () => console.log("DELETE FILE ACTION") }
];

const FOLDER_SCHEMA = [
  { title: "Open", action: () => console.log("OPEN FILE ACTION") },
  { title: "Rename", action: () => console.log("RENAME FILE ACTION") },
  { title: "Delete", action: () => console.log("DELETE FILE ACTION") }
];

const PROJECT_TITLE_SCHEMA = [
  { title: "Open", action: () => console.log("OPEN FILE ACTION") },
  { title: "Rename", action: () => console.log("RENAME FILE ACTION") },
  { title: "Delete", action: () => console.log("DELETE FILE ACTION") }
];

export default MENU_SCHEMA;
