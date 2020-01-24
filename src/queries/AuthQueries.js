import gql from "graphql-tag";

export const SIGNUP = gql`
	mutation Signup($email: String!, $username: String!, $password: String!, $rePassword: String!) {
		signup(signupInput: { email: $email, username: $username, password: $password, rePassword: $rePassword }) {
			success
			message
			user {
				id
				username
			}
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			success
			message
			token
		}
	}
`;
