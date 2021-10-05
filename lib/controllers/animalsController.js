const { Router } = require('express');
const animalService = require('../services/animalService.js');


module.exports = Router()


///---POST---///
  .post('/', async(req, res, next) =>
  {
    try
    {
      const animals = await animalService.archiveAnimal(req.body);
      res.json(animals);
    }
    catch(err)
    {
      next(err);
    }
  });
