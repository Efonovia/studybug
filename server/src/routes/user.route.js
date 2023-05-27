import { 
    getAllUsers, 
    getUser, 
    createNewStudySession, 
    deleteStudySession, 
    changeStudySessionName,
    createNewFlashCardsSet,
    deleteFlashCardsSet,
    editFlashCardsSet,
    createNewCard,
    deleteCard,
    addCardStat,
    createNewQuiz,
    deleteQuiz,
    addQuizQuestion,
    deleteQuizQuestion,
    addQuizStat,
    createNewNote,
    deleteNote,
    editNote,

} from "./user.controller.js";
import express from "express";

const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.get("/:id", getUser)

usersRouter.post("/:id/createstudysession", createNewStudySession)
usersRouter.post("/:id/:sessionId/delete", deleteStudySession)
usersRouter.post("/:id/:sessionId/name", changeStudySessionName)

usersRouter.post("/:id/:sessionId/notes/create", createNewNote)
usersRouter.post("/:id/:sessionId/notes/delete/:noteId", deleteNote)
usersRouter.post("/:id/:sessionId/notes/edit/:noteId", editNote)

usersRouter.post("/:id/:sessionId/flashcardsset/create", createNewFlashCardsSet)
usersRouter.post("/:id/:sessionId/flashcardsset/delete/:flashCardsSetId", deleteFlashCardsSet)
usersRouter.post("/:id/:sessionId/flashcardsset/edit/:flashCardsSetId", editFlashCardsSet)
usersRouter.post("/:id/:sessionId/flashcardsset/addcard/:flashCardsSetId", createNewCard)
usersRouter.post("/:id/:sessionId/flashcardsset/deletecard/:flashCardsSetId/:cardId", deleteCard)
usersRouter.post("/:id/:sessionId/flashcardsset/addcardstat/:flashCardsSetId/:cardId", addCardStat)

usersRouter.post("/:id/:sessionId/quizes/create", createNewQuiz)
usersRouter.post("/:id/:sessionId/quizes/delete/:quizId", deleteQuiz)
usersRouter.post("/:id/:sessionId/quizes/addquestion/:quizId", addQuizQuestion)
usersRouter.post("/:id/:sessionId/quizes/deletequestion/:quizId/:questionId", deleteQuizQuestion)
usersRouter.post("/:id/:sessionId/quizes/addquizstat/:quizId", addQuizStat)


export default usersRouter