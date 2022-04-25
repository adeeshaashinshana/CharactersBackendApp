const userModuleTypeDefs = require("./typeDefs/index");
const userModuleResolvers = require("./resolvers/index");
const { createModule } = require("graphql-modules");

const UserModule = createModule({
  id: "user-module",
  dirname: __dirname,
  typeDefs: userModuleTypeDefs,
  resolvers: userModuleResolvers,
});

module.exports = UserModule;
