const { Router } = require('express');
const speciesService = require('../services/speciesService.js');


module.exports = Router()

//POST
  .post('/', async(req, res, next) =>
  {
    try 
    {
      const species = await speciesService.archiveSpecies(req.body);
      res.json(species);
    } 
    catch (error) 
    {
      next(error);
    }
  });
