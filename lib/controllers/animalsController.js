const { Router } = require('express');
const Animals = require('../models/Animals.js');
// const animalService = require('../services/animalService.js');



module.exports = Router()


///---POST---///
  .post('/', async(req, res, next) => {
    try {
      const animals = await Animals.insert(req.body);
      res.json(animals);
    } catch(err) {
      next(err);
    }
  })



///---GET ID---///
  .get('/:id', async(req, res, next) => {
    try {
      const animal = await Animals.getId(req.params.id);
      res.send(animal);
    } catch(err) {
      next(err);
    }
  })


///---GET ANIMALS & SPECIES---///
  .get('/', async(req, res, next) =>
  {
    try
    {
      const animals = await Animals.animalSpecies();
      res.json(animals);
    } catch(err) {
      next(err);
    }
  })


  ///---UPDATE---///
  .patch('/:id', async(req, res, next) => {
    try {
      const patchAnimal = await Animals.update(req.body);
      res.json(patchAnimal);
    } catch(err) {
      next(err);
    }
  })



  ///---REMOVE---///
  .delete('/:id', async (req, res, next) => {
    try {
      const removeAnimal = await Animals.remove(req.params.id);
      res.send(removeAnimal);
    } catch(err) {
      next(err);
    }
  });


///---COUNT ANIMALS BY SPECIES---///
// .get('/count', async (req, res, next) => {
//   try
//   {
//     const countAnimals = await Animals.countAnimals();
//     console.log('COUNT AT ANIMAL CONTROLLER', countAnimals);
//     res.send(countAnimals);
//   } catch(err) {
//     next(err);
//   }
// });
