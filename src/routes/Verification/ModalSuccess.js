import React from "react";

import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Shape from "../../components/Shape/Shape";
import Icon from "../../components/Icon/Icon";

const ModalSuccess = () => {
	return (
		<Modal>
			<div className="mtpc-5">
				<Shape type="circle">
					<Icon type="checkmark" />
				</Shape>
			</div>
			<div className="mpc-4">
				<Text type="regular">Successfully Verified !</Text>
			</div>
			<div className="mbpc-5 mt-2">
				<Button type="btn-solid" style="capitalize">
					Log In
				</Button>
			</div>
		</Modal>
	);
};

export default ModalSuccess;
