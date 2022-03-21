import { Answer } from '../../types';
import { v4 as uuidv4 } from 'uuid';
const questions = require('./questions');
const answers: Answer[] = [
  {
    id: 'c7b7d20a-c9cc-4dc7-908c-0c2b1e3479aa',
    data: 'ding ding ding ding',
    questionId: questions[0].id,
  },
  {
    id: '395586d4-fe98-497f-9b8a-2fe7c1c71440',
    data: 'never long enough',
    questionId: questions[1].id,
  },
  {
    id: '67bdf838-a940-48db-8691-e73096483fc3',
    data: 'slippery as a slope!',
    questionId: questions[2].id,
  },
  {
    id: 'ceda0002-55c5-4477-8daa-fa08ba7b8c6a',
    data: 'never slippery enough',
    questionId: questions[2].id,
  },
  {
    id: '00e10880-49ad-4822-81ae-7366c145f972',
    data: 'yeehaw',
    questionId: questions[0].id,
  },
];

module.exports = answers;