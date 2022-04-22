const { gql } = require("apollo-server-express");

const userTypeDef = gql`
	type User {
		id: ID!
		name: String!
		age: Int!
		gender: String!
		isLogged: Boolean!
	}

	input UserInput {
		id: ID!
		name: String!
		age: Int!
		gender: String!
		isLogged: Boolean!
	}

	type Query {
		getAllUsers: [User]
	}

	type Mutation {
		createUser(input: UserInput!): User
	}
`;

module.exports = userTypeDef;
