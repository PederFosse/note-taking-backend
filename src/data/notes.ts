import { INotes } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const notes: INotes[] = [
  {
    id: uuidv4(),
    createdBy: 'Fredrikoh Rocher',
    createdAt: 1647871232386,
    updatedAt: 1647871232386,
    noteData: {
      header: 'Example Note',
      details:
        'This is a note, designed to help you get started with the awesome note-taking tool'
    }
  }
];
