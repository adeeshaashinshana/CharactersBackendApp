const UserSchema = require("../model/user.model");
const Logger = require("../../../shared/logger");

class UserService {
  /******** Get User By Name *******/
  async getUserByName(userName) {
    const isAvailableName = await UserSchema.findOne({ name: userName });

    if (isAvailableName === null) {
      // allow create new user
      const user = {
        name: userName,
      };

      const newUser = await this.createUser(user);
      Logger.info("==========< createUser >==========");
      return newUser;
    } else {
      return isAvailableName;
    }
  }

  /******** Create User *******/
  async createUser(user) {
    if (user.name !== "") {
      return await UserSchema.create(user);
    }
  }
}

module.exports = new UserService();
