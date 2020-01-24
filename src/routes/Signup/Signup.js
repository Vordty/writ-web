import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Spacer from "../../components/Spacer/Spacer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { AuthContext } from "../../contexts/AuthContext";

const Signup = () => {
	const [form, setForm] = useState({
		email: "",
		username: "",
		password: "",
		rePassword: ""
	});

	const { signup } = useContext(AuthContext);

	const onChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const onSignup = () => {
		signup(form);
	};

	return (
		<Background pattern="dots">
			<Button type="btn-ghost" style="capitalize corner-tl mt-4 ml-4">
				<Link to="/login">Log In</Link>
			</Button>
			<Card>
				<div className="mtpc-5">
					<Text type="title">SIGN UP</Text>
				</div>
				<Spacer count="18" symbol="~" />
				<Input
					containerStyle="mb"
					placeholder="Type your email"
					name="email"
					value={form.email}
					onChange={onChange}
				/>
				<Input
					containerStyle="mb"
					placeholder="Type your user name"
					name="username"
					value={form.username}
					onChange={onChange}
				/>
				<Input
					containerStyle="mb"
					hidden={true}
					placeholder="Type your password"
					name="password"
					value={form.password}
					onChange={onChange}
				/>
				<Input
					hidden={true}
					placeholder="Repeat your password"
					name="rePassword"
					value={form.rePassword}
					onChange={onChange}
				/>
				<Spacer count="18" symbol="~" />
				<div className="mbpc-5 mt-2">
					<Button type="btn-solid" style="capitalize" onClick={onSignup}>
						Sign up
					</Button>
				</div>
			</Card>
		</Background>
	);
};

export default Signup;
