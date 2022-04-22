const { gql } = require("apollo-server-express");

const userTypeDef = gql`
  type User {
    id: ID!
    name: String!
  }

  input userCreateInput {
    name: String!
  }

  type Query {
    getAllUsers: [User]
    getUserById(userId: ID): User
  }

  type Mutation {
    createUser(user: userCreateInput!): User
  }
`;

module.exports = userTypeDef;
