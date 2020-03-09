import React, { useState, useRef, useEffect, Fragment } from "react";

import "./Resizable.scss";

const Resizable = ({ width, customStyle, minWidth, maxWidth, restrictionTop, children }) => {
	const [resizableWidth, setResizableWidth] = useState(width);
	const [isResizing, setIsResizing] = useState(false);

	const [dragLinePositionX, setDragLinePositionX] = useState(0);

	const resizableRef = useRef(null);

	useEffect(() => {
		setDragLinePositionX(resizableRef.current.offsetLeft + resizableRef.current.clientWidth);
	}, [resizableRef.current, resizableWidth]);

	const isInRange = e => {
		return e.clientX < maxWidth && e.clientX > minWidth;
	};

	const isAtResizePoint = (target, clientX) => {
		var rect = target.getBoundingClientRect();
		var x = clientX - rect.left;

		const isString = typeof target.className === "string";
		const isAtResizePoint = rect.width - x < 5 && isString;

		if (isAtResizePoint) {
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
		if (e.button === 0) {
			e.preventDefault();
			if (isAtResizePoint(e.target, e.clientX)) {
				setIsResizing(true);
				document.body.style.cursor = "e-resize";
				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener("mouseup", onMouseUp);
			}
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
		<Fragment>
			<div
				className="resizable-drag-line"
				style={{
					left: dragLinePositionX
				}}
				onMouseMove={onMouseOver}
				onMouseDown={onMouseDown}
				onMouseLeave={onMouseLeave}
			></div>
			<div
				ref={resizableRef}
				style={{
					width: resizableWidth
				}}
				className={"resizable" + " " + customStyle}
			>
				{children}
			</div>
		</Fragment>
	);
};

export default Resizable;
