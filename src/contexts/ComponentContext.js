import React, { createContext, useState, useRef } from "react";

import ContextMenu from "../components/Shared/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/Shared/ContextMenu/ContextMenuItem/ContextMenuItem";

import { useOutsideAlerter } from "../helpers/OutsideClick";
import { positionMenu } from "../helpers/PositionContextMenu";
import CONTEXT_MENU_SCHEMA from "../schemas/ContextMenuSchema";

export const ComponentContext = createContext();

export const ComponentProvider = ({ children }) => {
	const contextMenuRef = useRef(null);
	useOutsideAlerter(contextMenuRef, () => hideContextMenu());

	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuType, setContextMenuType] = useState("");

	const showContextMenu = e => {
		setIsContextMenuOpen(true);
		positionMenu(e, contextMenuRef.current);
	};

	const hideContextMenu = () => {
		setIsContextMenuOpen(false);
	};

	const onRightClick = (e, type) => {
		setContextMenuType(type);
		if (e.button === 2) {
			document.addEventListener("contextmenu", onContextMenu);
		}
	};

	const onContextMenu = e => {
		e.preventDefault();
		showContextMenu(e);
		document.removeEventListener("contextmenu", onContextMenu);
	};

	const getContextMenuItems = () => {
		const result = CONTEXT_MENU_SCHEMA(contextMenuType);

		const items = result.map(item => <ContextMenuItem onClick={item.action}>{item.title}</ContextMenuItem>);

		return items;
	};

	return (
		<ComponentContext.Provider value={{ showContextMenu, hideContextMenu, onRightClick }}>
			{children}
			{isContextMenuOpen && <ContextMenu menuRef={contextMenuRef} items={getContextMenuItems} />}
		</ComponentContext.Provider>
	);
};
