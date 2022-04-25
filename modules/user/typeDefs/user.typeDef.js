const { gql } = require("apollo-server-express");

const userTypeDef = gql`
  type User {
    id: ID!
    name: String!
    savedCharacters: [Int]
  }

  input userCreateInput {
    name: String!
  }

  type Query {
    getUserByName(userName: String): User
  }

  type Mutation {
    createUser(user: userCreateInput!): User
    updateUser(userId: ID!, characterIds: [Int]): User
  }
`;

module.exports = userTypeDef;
