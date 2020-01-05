import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
	query {
		users {
			id
			firstName
			email
		}
	}
`;

export const Writ = () => {
	const { data, loading, error } = useQuery(GET_USERS);
	if (loading) return <div>Loading</div>;
	if (error) return <div>Error</div>;

	return <div>{data.users && data.users.map(user => <div key={user.id}>{user.firstName}</div>)}</div>;
};

export default Writ;
