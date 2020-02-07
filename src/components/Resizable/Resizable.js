import React, { useState, useRef } from "react";

import "./Resizable.scss";

const Resizable = ({ width, customStyle }) => {
	const [resizableWidth, setResizableWidth] = useState(width);
	const [isResizing, setIsResizing] = useState(false);

	const maxWidth = 480;
	const minWidth = 100;
	const resizableRef = useRef(null);

	const isInRange = e => {
		return e.clientX < maxWidth && e.clientX > minWidth;
	};

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
		if (isInRange(e)) {
			setResizableWidth(`${e.clientX - resizableRef.current.getBoundingClientRect().left}px`);
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
		<div
			ref={resizableRef}
			style={{
				width: resizableWidth
			}}
			className={"resizable" + " " + customStyle}
			onMouseMove={onMouseOver}
			onMouseDown={onMouseDown}
			onMouseLeave={onMouseLeave}
		></div>
	);
};

export default Resizable;
