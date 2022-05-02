import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import flashcardSetService from "../services/flashcard-set.service";
import flashcardsService from "../services/flashcards.service";
import notesService from "../services/notes.service";
import qaService from "../services/qa.service";

class DefaultDataController {
    async insertDefaultData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {defaultNote, defaultQuestions, defaultFlashcards} = req;
        const newUser = req.created as User;

        // insert flashcard-set and flashcards
        const set = await flashcardSetService.create({name: "default-data-set"}, newUser.id);
        defaultFlashcards.forEach(async fc => {
            fc.flashcardSetId = set.id;
            await flashcardsService.create(fc, newUser.id);
        })

        // insert default note
        await notesService.createNewNote({header: "Pannekake", details: defaultNote}, newUser.id);

        // insert default questions and save first questionId
        const question = await qaService.createQuestion(defaultQuestions[0], newUser.id);
        await qaService.createQuestion(defaultQuestions[1], newUser.id);

        // insert answer to first question
        await qaService.createAnswer({questionId: question.id, data: "Det gjør pannekakene tynnere og finere."}, newUser.id);

        res.send(req.created);
    }
}

export default new DefaultDataController();
