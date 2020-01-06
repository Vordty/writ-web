import gql from "graphql-tag";

export const SIGNUP = gql`
	mutation Signup(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
		$rePassword: String!
	) {
		signup(
			signupInput: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				password: $password
				rePassword: $rePassword
			}
		) {
			success
			message
			user {
				id
				firstName
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
