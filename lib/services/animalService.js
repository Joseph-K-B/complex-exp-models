const Animals = require('../models/Animals.js');


module.exports = class animalService
{
  ///---SAVE ANIMAL---///
  static async archiveAnimal({ animal, diet, speciesId })
  {
    const animals = await Animals.insert({ animal, diet, speciesId });
    return animals;
  }
};
