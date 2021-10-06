const { Router } = require('express');
const Animals = require('../models/Animals.js');
// const animalService = require('../services/animalService.js');



module.exports = Router()


///---POST---///
  .post('/', async(req, res, next) =>
  {
    try
    {
      const animals = await Animals.insert(req.body);
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
      const animals = await Animals.getAll();
      res.send(animals);
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
      const animal = await Animals.getId(req.params.id);
      res.send(animal);
    }
    catch(err)
    {
      next(err);
    }
  });


// ///---GET ANIMALS & SPECIES---///
// .get('/', async(req, res, next) =>
// {
//   try
//   {
//     const animals = await animalService.getAllAnimalsSpecies(req.body);
//     res.json(animals);
//   }
//   catch(err)
//   {
//     next(err);
//   }
// });
