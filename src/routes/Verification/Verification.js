import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import ModalSuccess from "./ModalSuccess";
import ModalFailure from "./ModalFailure";

import { AuthContext } from "../../contexts/AuthContext";

const Verification = () => {
	const history = useHistory();

	let input1 = null;
	let input2 = null;
	let input3 = null;
	let input4 = null;

	const [code, setCode] = useState({
		"1": "",
		"2": "",
		"3": "",
		"4": ""
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [verificationStatus, setVerificationStatus] = useState(false);

	const { user } = useContext(AuthContext);

	const onInputChange = e => {
		setCode({
			...code,
			[e.target.name]: e.target.value
		});
	};

	const onInputKeyUp = e => {
		const targetName = e.target.name;

		const dirForward = e.keyCode !== 8 && e.keyCode !== 37;

		switch (targetName) {
			case "1":
				if (dirForward) input2.focus();
				break;
			case "2":
				if (dirForward) {
					input3.focus();
				} else {
					input1.focus();
				}
				break;
			case "3":
				if (dirForward) {
					input4.focus();
				} else {
					input2.focus();
				}
				break;
			case "4":
				if (!dirForward) input3.focus();
				break;
		}
	};

	const onResend = () => {};

	const onConfirm = () => {
		setIsModalOpen(true);
	};

	const onChangeEmail = () => {
		history.push("/signup");
	};

	return (
		<Background pattern="dots">
			{isModalOpen && (verificationStatus ? <ModalSuccess /> : <ModalFailure />)}
			<Card style="ghost">
				<div className="mtpc-5">
					<Text type="title">Verify your email</Text>
				</div>
				<div className="mtpc-4">
					<Text type="regular">Please enter 4 digit code sent to:</Text>
				</div>
				<div className="mtpc-1">
					<Text type="medium">{user.email}</Text>
				</div>
				<div className="mtpc-3 flex-h">
					<div className="mpc-2">
						<Input
							autoFocus
							style="input-square"
							containerStyle="mb"
							maxLength="1"
							inputRef={input => {
								input1 = input;
							}}
							name={"1"}
							value={code["1"]}
							onChange={onInputChange}
							onKeyUp={onInputKeyUp}
						/>
					</div>
					<div className="mpc-2">
						<Input
							style="input-square"
							containerStyle="mb"
							maxLength="1"
							inputRef={input => {
								input2 = input;
							}}
							name={"2"}
							value={code["2"]}
							onChange={onInputChange}
							onKeyUp={onInputKeyUp}
						/>
					</div>
					<div className="mpc-2">
						<Input
							style="input-square"
							containerStyle="mb"
							maxLength="1"
							inputRef={input => {
								input3 = input;
							}}
							name={"3"}
							value={code["3"]}
							onChange={onInputChange}
							onKeyUp={onInputKeyUp}
						/>
					</div>
					<div className="mpc-2">
						<Input
							style="input-square"
							containerStyle="mb"
							maxLength="1"
							inputRef={input => {
								input4 = input;
							}}
							name={"4"}
							value={code["4"]}
							onChange={onInputChange}
							onKeyUp={onInputKeyUp}
						/>
					</div>
				</div>
				<div className="mpc-3">
					<Button type="btn-ghost" style="capitalize" onClick={onResend}>
						Resend Code
					</Button>
				</div>
				<Button type="btn-solid" style="capitalize" onClick={onConfirm}>
					Confirm
				</Button>
				<div className="mpc-3">
					<Button type="btn-ghost" style="capitalize" onClick={onChangeEmail}>
						Change Email
					</Button>
				</div>
			</Card>
		</Background>
	);
};

export default Verification;
