const { createApplication } = require("graphql-modules");
const UserModule = require("../modules/user/user.module");
const application = createApplication({
  modules: [UserModule],
});

module.exports = application;
