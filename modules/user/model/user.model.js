const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
