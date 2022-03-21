export interface FlashcardInput {
  header: string;
  front: string;
  back: string;
}

export interface Flashcard extends FlashcardInput {
  id: string;
}

