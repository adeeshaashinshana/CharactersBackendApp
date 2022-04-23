const UserService = require("../service/user.service");

const userResolver = {
  Query: {
    /******* getUserByName ******/
    getUserByName: async (_, args) => {
      try {
        console.log("=============== getUser ===============");
        const { userName } = args;
        return await UserService.getUserByName(userName);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  Mutation: {
    /******* createUser ******/
    createUser: async (_, args) => {
      try {
        console.log("=============== createUser ===============");
        const { user } = args;
        return await UserService.createUser(user);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};

module.exports = userResolver;
