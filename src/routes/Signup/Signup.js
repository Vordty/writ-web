import React from "react";

import Background from "../../components/Background/Background";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Spacer from "../../components/Spacer/Spacer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Signup = () => {
	return (
		<Background pattern="dots">
			<Button type="btn-ghost" style="capitalize corner-tl mt-4 ml-4">
				Log In
			</Button>
			<Card>
				<div className="mtpc-5">
					<Text type="title">SIGN UP</Text>
				</div>
				<Spacer count="18" symbol="~" />
				<Input containerStyle="mb" placeholder="Type your email" />
				<Input containerStyle="mb" placeholder="Type your user name" />
				<Input containerStyle="mb" hidden={true} placeholder="Type your password" />
				<Input hidden={true} placeholder="Repeat your password" />
				<Spacer count="18" symbol="~" />
				<div className="mbpc-5 mt-2">
					<Button type="btn-solid" style="capitalize">
						Sign up
					</Button>
				</div>
			</Card>
		</Background>
	);
};

export default Signup;
