import React from "react";

import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Shape from "../../components/Shape/Shape";
import Icon from "../../components/Icon/Icon";

const ModalFailure = () => {
	return (
		<Modal>
			<div className="mtpc-5">
				<Shape type="circle">
					<Icon type="x" />
				</Shape>
			</div>
			<div className="mpc-4">
				<Text type="regular">Verification Failed! !</Text>
			</div>
			<div className="mbpc-5 mt-2">
				<Button type="btn-solid" style="capitalize">
					Try Again
				</Button>
			</div>
		</Modal>
	);
};

export default ModalFailure;
