const Animals = require('../models/Animals.js');


module.exports = class animalService
{
  ///---SAVE ANIMAL---///
  static async archiveAnimal({ animal, diet, speciesId })
  {
    const animals = await Animals.insert({ animal, diet, speciesId });
    return animals;
  }


  ///---GET ALL ANIMALS TABLE---///
  static async selectAll()
  {
    const animals = await Animals.getAll();
    return animals;
  }


  ///---GETS ANIMAL BY ID---///
  static async selectId()
  {
    const animal = await Animals.getId();
    return animal;
  }


  ///---GETS ALL ANIMALS W/ SPECIES ID---///
  static async getAllAnimalsSpecies()
  {
    const animals = await Animals.animalSpecies();
    return animals;
  }
};
