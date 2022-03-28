export interface FlashcardInput {
  header: string;
  front: string;
  back: string;
  flashcardSetId: string;
}

export interface Flashcard extends FlashcardInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
