const characterModuleTypeDefs = require("./typeDefs/index");
const characterModuleResolvers = require("./resolvers/index");
const { createModule } = require("graphql-modules");

const CharacterModule = createModule({
  id: "character-module",
  dirname: __dirname,
  typeDefs: characterModuleTypeDefs,
  resolvers: characterModuleResolvers,
});

module.exports = CharacterModule;
