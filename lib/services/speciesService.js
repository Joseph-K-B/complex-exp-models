
const Species = require('../models/Species.js');
// const pool = require('../utils/pool.js');

module.exports = class speciesService
{

  ///---SAVE SPECIES---///
  static async archiveSpecies({ name, type, extinct })
  {
    const species = await Species.insert({ name, type, extinct });
    return species;
  }
};