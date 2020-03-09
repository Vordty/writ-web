import React, { createContext, useState, useRef, useEffect, useContext } from "react";

import ContextMenu from "../components/Shared/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/Shared/ContextMenu/ContextMenuItem/ContextMenuItem";

import { useOutsideAlerter } from "../helpers/OutsideClick";
import { positionMenu } from "../helpers/PositionContextMenu";
import MENU_SCHEMA from "../schemas/MenuSchema";
import { FileContext } from "./FileContext";

export const ComponentContext = createContext();

export const ComponentProvider = ({ children }) => {
	const contextMenuRef = useRef(null);
	useOutsideAlerter(contextMenuRef, () => hideContextMenu());

	const fileContext = useContext(FileContext);

	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [menuType, setMenuType] = useState("");
	const [lastEvent, setLastEvent] = useState();
	const [passedItem, setPassedItem] = useState();

	useEffect(() => {
		if (isContextMenuOpen) {
			positionMenu(lastEvent, contextMenuRef.current);
		}
	}, [isContextMenuOpen]);

	const showContextMenu = e => {
		setIsContextMenuOpen(true);
	};

	const hideContextMenu = () => {
		setIsContextMenuOpen(false);
	};

	const onMenuClick = (e, type, fileId) => {
		e.persist();
		e.preventDefault();
		setLastEvent(e);
		setPassedItem(fileId);
		setMenuType(type);
		showContextMenu(e);
	};

	const getContextMenuItems = () => {
		const result = MENU_SCHEMA(menuType, fileContext, passedItem);

		const items = result.map(item => (
			<ContextMenuItem onClick={item.action} key={item.title}>
				{item.title}
			</ContextMenuItem>
		));

		return items;
	};

	return (
		<ComponentContext.Provider value={{ showContextMenu, hideContextMenu, onMenuClick }}>
			{children}
			{isContextMenuOpen && <ContextMenu menuRef={contextMenuRef} items={getContextMenuItems} />}
		</ComponentContext.Provider>
	);
};
