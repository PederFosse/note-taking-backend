import { INotes } from '../types';
import { notes } from '../data/notes';

class NotesService {
  getAll = (): INotes[] => notes;

  getById = (id: string): INotes | undefined => {
    const note: INotes | undefined = notes.find((e: INotes) => e.id === id);
    return note;
  };
}

export default new NotesService();