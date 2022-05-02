import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import flashcardSetService from "../services/flashcard-set.service";
import flashcardsService from "../services/flashcards.service";
import notesService from "../services/notes.service";
import qaService from "../services/qa.service";
import { FlashcardInput, NoteInput, QuestionInput } from "../types";

class DefaultDataController {
    async insertDefaultData(req: Request, res: Response, next: NextFunction): Promise<void> {
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

const defaultNotes: NoteInput[] = [
    {
        details: "For 8 pannekaker\n\n4 stk. egg\n3 dl hvetemel eller 50/50 siktet og sammalt hvetemel\n0,5 ts salt\n5 dl melk\n1 ss smør\n\nSLIK GJØR DU\nBland mel og salt. Tilsett halvparten av melken. Visp sammen til en tykk og klumpfri røre. Tilsett resten av melken. Visp inn egg. La pannekakerøren svelle i ca. ½ time.\n\nIkke spar på eggene i en pannekakerøre. Eggende binder røren, slik at du kan bruke mindre mel. Da blir det tynne og fine pannekaker.\n\nSmelt margarin i en god og varm stekepanne. Hell i en øse med pannekakerøre og vend på pannen, slik at røren legger seg i et jevnt lag. Snu pannekaken når den har stivnet på oversiden og blitt gyllenbrun på undersiden.\n\nNår pannekaken er stekt på begge sider, brettes den sammen og legges i et ildfast fat med lokk. Pannekakene holder da varmen, slik at alle kan spise sammen.\n\nServer gjerne pannekakene sammen med ertesuppe til middag eller som en selvstendig middag, med blåbærsyltetøy eller sukker på.",
        header: "Oppskrift pannekake",
    },
    {
        details: "Hello!\nFor this test we want you to take notes for this 2 minute video on “Why It's Hard To Land on Mars”.\nCreate a new note and write your notes in there :)\n\nhttps://www.youtube.com/watch?v=h2nqgKL2JQU",
        header: "A bit longer test"
    },
];

const defaultFlashcards: FlashcardInput[] = [
    {
        front: "Antall egg for 8 pannekaker",
        back: "4 egg",
        header: "",
        flashcardSetId: "",
    },
    {
        front: "Pannekake stekes i ...?",
        back: "stekepanne",
        header: "",
        flashcardSetId: "",
    },
];

const defaultQuestions: QuestionInput[] = [
    {
        data: "Hvilken effekt har egg i røren?",
    },
    {
        data: "Hvor lnge skal jeg la pannekakerøren svelle?",
    }
];
