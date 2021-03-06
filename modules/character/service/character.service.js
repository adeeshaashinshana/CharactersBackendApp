const CharacterSchema = require("../model/character.model");

class CharacterService {
  /******** get All Characters *******/
  async getAllCharacters() {
    return await CharacterSchema.find();
  }

  /******* get Characters By IDs ******/
  async getCharactersByIDs(characterIds) {
    const characters = await CharacterSchema.find({
      characterID: { $in: characterIds },
    });
    return characters;
  }
}

module.exports = new CharacterService();
