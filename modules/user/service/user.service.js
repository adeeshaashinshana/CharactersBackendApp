const UserSchema = require("../model/user.model");

class UserService {
  /******** Get User By ID *******/
  async getUserById(userId) {
    const dbUser = await UserSchema.findOne({ _id: userId });
    return dbUser;
  }

  /******** Get All Users *******/
  async getAllUsers() {
    return await UserSchema.find();
  }

  /******** Create User *******/
  async createUser(user) {
    return await UserSchema.create(user);
  }
}

module.exports = new UserService();
