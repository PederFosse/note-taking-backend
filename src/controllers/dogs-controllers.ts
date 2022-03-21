import { Dog } from "../types";

const dogs: Dog[] = require('../data/dogs')

export class DogsController {
  constructor(){}

  getAllDogs(): Dog[] {
    return dogs;
  }

  getOneDog(id: number): Dog | undefined {
    const dog = dogs.find((dog) => dog.id === id);
    return dog;
  }
}