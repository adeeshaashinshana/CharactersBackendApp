const UserService = require("../service/user.service");

const userResolver = {
  Query: {
    /******* getUserById ******/
    getUserById: async (_, args) => {
      try {
        console.log("=============== getUser ===============");
        const { userId } = args;
        return await UserService.getUserById(userId);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    /******* getAllUsers ******/
    getAllUsers: async (_, __) => {
      try {
        console.log("=============== getAllUsers ===============");
        return await UserService.getAllUsers();
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
        const response = await UserService.createUser(user);
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};

module.exports = userResolver;
