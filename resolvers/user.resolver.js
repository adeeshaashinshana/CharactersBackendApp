const UserModel = require("../models/user.model");

const userResolvers = {
	Query: {
		getAllUsers: async (_, args) => {
			try {
				console.log("===============getAllUsers===============");
				return await UserModel.find();
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
	},
	Mutation: {
		createUser: async (_, args) => {
			try {
				console.log("===============createUser===============");
				const user = args.input;
				return await UserModel.create(user);
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
	},
};

module.exports = userResolvers;
