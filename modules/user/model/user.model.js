const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    savedCharacters: {
      type: [Number],
      default: [],
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
