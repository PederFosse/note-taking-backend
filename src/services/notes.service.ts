import { INotes } from '../types';
class NotesService {
  //getAll = (): INotes[] => notes;
  getAll = (): void => {};

  getById = (id: string): INotes | undefined => {
    return;
  };
}

export default new NotesService();
