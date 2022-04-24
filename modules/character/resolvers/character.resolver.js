const Logger = require("../../../shared/logger");

const CharacterService = require("../service/character.service");

const characterResolver = {
  Query: {
    /******* getAllCharacters ******/
    getAllCharacters: async (_, __) => {
      try {
        Logger.info("==========< get All Characters >==========");
        return await CharacterService.getAllCharacters();
      } catch (error) {
        Logger.error(error);
        throw error;
      }
    },

    /******* get Characters By IDs ******/
    getCharactersByIDs: async (_, args) => {
      try {
        Logger.info("===============< get Characters By IDs >===============");
        const { characterIds } = args;
        return await CharacterService.getCharactersByIDs(characterIds);
      } catch (error) {
        Logger.error(error);
      }
    },
  },
};

module.exports = characterResolver;
