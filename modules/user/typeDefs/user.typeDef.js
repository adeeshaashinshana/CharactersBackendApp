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
    getUserByName(userName: String): User
  }

  type Mutation {
    createUser(user: userCreateInput!): User
  }
`;

module.exports = userTypeDef;
