import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import flashcardSetService from "../services/flashcard-set.service";
import flashcardsService from "../services/flashcards.service";
import notesService from "../services/notes.service";
import qaService from "../services/qa.service";

class DefaultDataController {
    async insertDefaultData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {defaultNotes, defaultQuestions, defaultFlashcards} = req;
        const newUser = req.created as User;

        // insert flashcard-set and flashcards
        const set = await flashcardSetService.create({name: "default-data-set"}, newUser.id);
        defaultFlashcards.forEach(async fc => {
            fc.flashcardSetId = set.id;
            await flashcardsService.create(fc, newUser.id);
        })

        // insert default notes
        defaultNotes.forEach(async note => {
            await notesService.createNewNote(note, newUser.id);
        })

        // insert default questions and save first questionId
        const question = await qaService.createQuestion(defaultQuestions[0], newUser.id);
        await qaService.createAnswer({questionId: question.id, data: "Det gjør pannekakene tynnere og finere."}, newUser.id);
        await qaService.createQuestion(defaultQuestions[1], newUser.id);


        marsQA.forEach(async qa => {
            const question = await qaService.createQuestion({data: qa.q}, newUser.id);
            await qaService.createAnswer({questionId: question.id, data: qa.a}, newUser.id);
        });


        res.send(req.created);
    }
}

export default new DefaultDataController();

const marsQA: {q: string, a: string}[] = [
    {
        q: "Why is it easier to land on the moon?",
        a: "Because the moon has no atmosphere and noes not need heavy heatshields"
    },
    {
        q: "What spacecraft used the hovering sky crane to land?",
        a: "NASA's Perseverance in 2020",
    },
    {
        q: "Can parachutes be used on Mars?",
        a: "Yes, but it will no be able to slow the spacecraft down enough to land safely"
    }
];
