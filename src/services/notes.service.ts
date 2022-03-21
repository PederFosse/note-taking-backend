import { INotes } from '../types';
import { notes } from '../data/notes';

const getAll = (): INotes[] => notes;

const getById = (id: string): INotes | undefined => {
  const note: INotes | undefined = notes.find((e: INotes) => e.id === id);
  return note;
};

module.exports = {
  getAll,
  getById
};
