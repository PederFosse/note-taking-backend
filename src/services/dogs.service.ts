import { Dog } from '../types';
const dogs: Dog[] = require('../data/dogs');

const getAll = (): Dog[] => dogs;

const getById = (id: string): Dog | undefined => {
  const dog = dogs.find((e) => e.id === id);
  return dog;
};

module.exports = {
  getAll,
  getById,
};
