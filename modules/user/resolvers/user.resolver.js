const Logger = require("../../../shared/logger");

const UserService = require("../service/user.service");

const userResolver = {
  Query: {
    /******* getUserByName ******/
    getUserByName: async (_, args) => {
      try {
        Logger.info("==========< getUser >==========");
        const { userName } = args;
        return await UserService.getUserByName(userName);
      } catch (error) {
        Logger.error(error);
        throw error;
      }
    },
  },

  Mutation: {
    /******* createUser ******/
    createUser: async (_, args) => {
      try {
        Logger.info("==========< createUser >==========");
        const { user } = args;
        return await UserService.createUser(user);
      } catch (error) {
        Logger.error(error);
        throw error;
      }
    },

    /******* updateUser ******/
    updateUser: async (_, args) => {
      try {
        Logger.info("==========< updateUser >==========");
        const { userId, characterIds } = args;
        return await UserService.updateUser(userId, characterIds);
      } catch (error) {
        Logger.error(error);
        throw error;
      }
    },
  },
};

module.exports = userResolver;
