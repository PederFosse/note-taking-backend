import { Request, Response, NextFunction, response } from "express"
import { AnswerInput, FlashcardInput, NoteInput, QuestionInput } from "../types"

export async function mountDefaultData(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.defaultNotes = defaultNotes;
    req.defaultQuestions = defaultQuestions;
    req.defaultFlashcards = defaultFlashcards;
    next();
}

const defaultNotes: NoteInput[] = [
    {
        details: "For 8 pannekaker\n\n4 stk. egg\n3 dl hvetemel eller 50/50 siktet og sammalt hvetemel\n0,5 ts salt\n5 dl melk\n1 ss smør\n\nSLIK GJØR DU\nBland mel og salt. Tilsett halvparten av melken. Visp sammen til en tykk og klumpfri røre. Tilsett resten av melken. Visp inn egg. La pannekakerøren svelle i ca. ½ time.\n\nIkke spar på eggene i en pannekakerøre. Eggende binder røren, slik at du kan bruke mindre mel. Da blir det tynne og fine pannekaker.\n\nSmelt margarin i en god og varm stekepanne. Hell i en øse med pannekakerøre og vend på pannen, slik at røren legger seg i et jevnt lag. Snu pannekaken når den har stivnet på oversiden og blitt gyllenbrun på undersiden.\n\nNår pannekaken er stekt på begge sider, brettes den sammen og legges i et ildfast fat med lokk. Pannekakene holder da varmen, slik at alle kan spise sammen.\n\nServer gjerne pannekakene sammen med ertesuppe til middag eller som en selvstendig middag, med blåbærsyltetøy eller sukker på.",
        header: "Oppskrift pannekake",
    },
    {
        details: "Hello!\nFor this test we want you to take notes for this 2 minute video on “Why It's Hard To Land on Mars”.\nCreate a new note and write your notes in there :)\n\nhttps://www.youtube.com/watch?v=h2nqgKL2JQU",
        header: "A bit longer test"
    },
]
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
]
const defaultQuestions: QuestionInput[] = [
    {
        data: "Hvilken effekt har egg i røren?",
    },
    {
        data: "Hvor lnge skal jeg la pannekakerøren svelle?",
    }
]