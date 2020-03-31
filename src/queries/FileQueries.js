import gql from "graphql-tag";

export const GET_FILETREE = gql`
	query {
		fileTree {
			id
			data
			projectId
		}
	}
`;

export const UPDATE_FILETREE = gql`
	mutation($id: Int!, $data: JSON!) {
		updateFileTree(id: $id, data: $data) {
			success
			message
			data
		}
	}
`;
