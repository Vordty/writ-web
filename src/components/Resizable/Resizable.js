import React, { useState, useRef } from "react";

import "./Resizable.scss";

const Resizable = ({ width, height, customStyle }) => {
	const [resizableWidth, setResizableWidth] = useState(width);
	const [isResizing, setIsResizing] = useState(false);

	const maxWidth = 600;
	const minWidth = 100;

	const isAtResizePoint = (target, clientX) => {
		var rect = target.getBoundingClientRect();
		var x = clientX - rect.left;

		if (rect.width - x < 5) {
			return true;
		} else {
			return false;
		}
	};

	const onMouseMove = e => {
		if (e.button === 0) {
			if (e.clientX - e.target.getBoundingClientRect().left > minWidth && e.clientX < maxWidth) {
				setResizableWidth(`${e.clientX - e.target.getBoundingClientRect().left}px`);
			}
		}
	};

	const onMouseUp = e => {
		e.preventDefault();
		setIsResizing(false);
		document.body.style.cursor = "default";
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
	};

	const onMouseDown = e => {
		e.preventDefault();
		if (isAtResizePoint(e.target, e.clientX)) {
			setIsResizing(true);
			document.body.style.cursor = "e-resize";
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
		}
	};

	const onMouseOver = e => {
		if (!isResizing) {
			e.preventDefault();
			if (isAtResizePoint(e.target, e.clientX)) {
				document.body.style.cursor = "e-resize";
			} else {
				document.body.style.cursor = "default";
			}
		}
	};

	const onMouseLeave = e => {
		if (!isResizing) {
			document.body.style.cursor = "default";
		}
	};

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<div
				style={{
					height: height,
					width: resizableWidth
				}}
				className={"resizable" + " " + customStyle}
				onMouseMove={onMouseOver}
				onMouseDown={onMouseDown}
				onMouseLeave={onMouseLeave}
			></div>
		</div>
	);
};

export default Resizable;
