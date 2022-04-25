const { createApplication } = require("graphql-modules");
const UserModule = require("../modules/user/user.module");
const CharacterModule = require("../modules/character/character.module");
const application = createApplication({
  modules: [UserModule, CharacterModule],
});

module.exports = application;
