import React, { useState, useEffect } from "react";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import "./ListDraggable.scss";

const ListDraggable = ({ children, customStyle }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(getItems());
	}, []);

	const getItems = () => {
		const items = [];

		React.Children.map(children, (child, index) => items.push(child));

		return items;
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setItems(arrayMove(items, oldIndex, newIndex));
	};

	const SortableItem = SortableElement(({ value }) => {
		return (
			<div className="list-draggable-item" key={value}>
				{value}
			</div>
		);
	});

	const SortableList = SortableContainer(({ items }) => {
		return (
			<div className="list-draggable">
				{items.map((value, index) => (
					<SortableItem key={`item-${value.key}`} index={index} value={value} />
				))}
			</div>
		);
	});

	return <SortableList items={items} onSortEnd={onSortEnd} axis={"x"} />;
};

export default ListDraggable;
