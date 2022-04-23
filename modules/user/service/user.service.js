const UserSchema = require("../model/user.model");

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
      console.log("=============== createUser ===============");
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
