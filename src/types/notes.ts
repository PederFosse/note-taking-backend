<<<<<<< HEAD
export interface INotes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  header: string;
  details: string;
=======
export interface Note {
  id: string;
  header: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
>>>>>>> 84e5305 (added prisma functionality for notes)
}
