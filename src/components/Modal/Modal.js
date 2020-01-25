import React from "react";

import Overlay from "../Overlay/Overlay";
import Card from "../Card/Card";

const Modal = ({ children, ...props }) => {
	return (
		<Overlay customStyle="flex">
			<Card>{children}</Card>
		</Overlay>
	);
};

export default Modal;
