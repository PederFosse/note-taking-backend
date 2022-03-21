import { Request, Response } from 'express';

const { dogsService } = require('../services');

const getAllDogs = (req: Request, res: Response): void => {
  const dogs = dogsService.getAll();
  res.send(dogs);
};

const getOneDog = (req: Request, res: Response): void => {
  const dog = dogsService.getById(req.params.id);
  if (!dog) {
    throw new Error('not found'); // use some api-error or something
  }
  res.send(dog);
};

module.exports = {
  getAllDogs,
  getOneDog,
};
