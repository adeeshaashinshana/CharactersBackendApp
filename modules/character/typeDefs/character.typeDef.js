const { gql } = require("apollo-server-express");

const characterTypeDef = gql`
  type Character {
    _id: Int
    name: String
    image: String
    species: String
    gender: String
    origin: OriginData
    status: String
    episode: [EpisodeData]
  }

  type OriginData {
    name: String
    dimension: String
  }

  type EpisodeData {
    id: Int
    name: String
    air_date: String
  }

  extend type Query {
    getAllCharacters: [Character]
    # getCharactersByIDs(characterIds: [ID!]): [Character!]
  }
`;

module.exports = characterTypeDef;
