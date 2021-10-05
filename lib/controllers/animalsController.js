const { Router } = require('express');
const animalService = require('../services/animalService.js');
const { get } = require('./speciesController.js');


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
  })



///---GET ALL---///
  .get('/', async(req, res, next) =>
  {
    try
    {
      const animals = await animalService.selectAll(req.body);
      res.json(animals);
    }
    catch(err)
    {
      next(err);
    }
  })


  ///---GET ID---///
  .get('/:id', async(req, res, next) =>
  {
    try
    {
      const animal = await animalService.selectId(req.params.id);
      res.json(animal);
    }
    catch(err)
    {
      next(err);
    }
  });
