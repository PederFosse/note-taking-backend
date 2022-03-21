export interface INoteData {
  header: string;
  details: string;
}

export interface INotes {
  id: string;
  createdBy?: string;
  createdAt: number;
  updatedAt: number;
  noteData: INoteData;
}
