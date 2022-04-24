const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    characterID: {
      type: Number,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    species: {
      type: String,
    },
    gender: {
      type: String,
    },
    origin: {
      name: {
        type: String,
      },
      dimension: {
        type: String,
      },
    },
    status: {
      type: String,
    },
    episode: {
      id: {
        type: Number,
      },
      name: {
        type: String,
      },
      air_date: {
        type: String,
      },
    },
  },
  {
    collection: "characters",
  }
);

module.exports = mongoose.model("Character", characterSchema);
