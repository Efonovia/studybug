import UserDatabase from "../models/user.mongo.js";
import { nanoid } from "nanoid"
import bcrypt from "bcrypt"


export const getAllUsers = async (req, res) => {
    try {
        return res.status(200).json(await UserDatabase.find({}, { '_id': 0, '__v': 0 }))
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserDatabase.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const loginUser = async(req, res) => {
  try {
    const { email, password } = req.body
    //Check if the user exists by using their email
    const user = await UserDatabase.findOne({ email: email })
    if(!user) {
      return res.status(400).json({ok: false, msg: "invalid email" })
    }

    //Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ok: false, msg: "Invalid credentials" })

    
    return await res.status(200).json({ ok: true, user: user })
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}

export const createNewUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath
    } = req.body

    console.log(req.body)

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    UserDatabase.findOne({ email: email })
    .then((user) => {
      if (user) {
        console.log(user); // Found user
        return res.status(200).json({exists: true, body: user})
      } else {
          console.log(`User with email ${email} not found.`);

          const newUser = new UserDatabase({
            firstName,
            lastName,
            email,
            password: passwordHash || "",
            picturePath: picturePath || "",
            studySessions: []
          })

          newUser.save().then(() => {
            console.log('New person added successfully');
          }).catch((error) => {
              console.log(error);
            });

        return res.status(201).json({exists: false, body: newUser})
      }
    })
    .catch((error) => {
      console.log(`Error finding user with email ${email}: ${error}`);
      return res.status(500).json({error: error.message})
    });

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    UserDatabase.deleteOne({ _id: id })
    .then(() => {
      console.log('Document deleted successfully')
    })
    .catch((error) => {
      console.log(error);
    });

    return res.status(201).json(UserDatabase)
} catch (error) {
    console.log(error)
    return res.status(404).json({error: error.message})
}
}

export const createNewStudySession = async (req, res) => {
    try {
        const { id } = req.params
        const reqName = req.body.name
        console.log(id, reqName)
        const user = await UserDatabase.findById(id)
        const newStudySessionId = nanoid()
        const newStudySession = {
            id: newStudySessionId,
            name: reqName,
            notes: [],
            quizes: [],
            flashCardsList: [],
        }

        
        user.studySessions.push(newStudySession)
        await user.save()

        const formattedUser = await UserDatabase.findById(id)
        const createdStudySession = formattedUser.studySessions.find(session => session.id === newStudySessionId)
        return res.status(201).json(createdStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const deleteStudySession = async (req, res) => {
    try {
        const { id, sessionId } = req.params
        console.log("sessionId: ", sessionId)
        const user = await UserDatabase.findById(id)
        user.studySessions = user.studySessions.filter(session => session.id !== sessionId)
        
        await user.save()

        const formattedUser = await UserDatabase.findById(id)
        const formattedStudySessions = formattedUser.studySessions
        return res.status(201).json(formattedStudySessions)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const changeStudySessionName = async (req, res) => {
    try {
        const { id, sessionId } = req.params
        console.log("sessionId: ", sessionId)
        UserDatabase.findOneAndUpdate(
            { _id: id, 'studySessions.id': sessionId },
            { $set: { 'studySessions.$.name': req.body.name } },
          )
            .then(updatedUser => {
              console.log(updatedUser.studySessions);
            })
            .catch(err => {
              console.error(err);
            });

        const formattedUser = await UserDatabase.findById(id)
        const formattedStudySession = formattedUser.studySessions.find(session => session.id === sessionId)
        return res.status(201).json(formattedStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const createNewNote = async (req, res) => {
    try {
        const { id, sessionId } = req.params
        const newNote = {
            "id": nanoid(),
            "name": req.body.name,
            "content": req.body.content
        }
          
        UserDatabase.findOneAndUpdate(
        { _id: id, 'studySessions.id': sessionId },
        { $push: { 'studySessions.$.notes': newNote } },
        { new: true }
        )
        .then((updatedDocument) => {
        console.log(updatedDocument);
        })
        .catch((error) => {
        console.log(error);
        });

        const formattedUser = await UserDatabase.findById(id)
        const updatedStudySession = formattedUser.studySessions.find(session => session.id === sessionId).notes
        return res.status(201).json(updatedStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id, sessionId, noteId } = req.params

        UserDatabase.updateOne(
        { _id: id, 'studySessions.id': sessionId },
        { $pull: { 'studySessions.$.notes': {id: noteId} } },
        { new: true }
        )
        .then((updatedDocument) => {
        console.log(updatedDocument);
        })
        .catch((error) => {
        console.log(error);
        });

        const formattedUser = await UserDatabase.findById(id)
        const updatedStudySession = formattedUser.studySessions.find(session => session.id === sessionId).notes
        return res.status(201).json(updatedStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const editNote = async (req, res) => {
    try {
      const { id, sessionId, noteId } = req.params;
      const editedNote = {
        newName: req.body.name,
        newContent: req.body.content
      }

      if(editedNote.newName) {
          await UserDatabase.findOneAndUpdate(
            { _id: id, "studySessions.id": sessionId, },
            { $set: { "studySessions.$[session].notes.$[note].name": editedNote.newName } },
            { arrayFilters: [{ "session.id": sessionId }, { "note.id": noteId }] }
          );
      }

      if(editedNote.newContent) {
          await UserDatabase.findOneAndUpdate(
            { _id: id, "studySessions.id": sessionId, },
            { $set: { "studySessions.$[session].notes.$[note].content": editedNote.newContent } },
            { arrayFilters: [{ "session.id": sessionId }, { "note.id": noteId }] }
          );
      }

      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find(session => session.id === sessionId);
      const updatedNote = studySession.notes.find(note => note.id === noteId);
      return res.status(201).json(updatedNote);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
}

export const createNewFlashCardsSet = async (req, res) => {
    try {
        const { id, sessionId } = req.params
        const flashCardsSetId = nanoid()
        const newFlashCardSet = {
            id: flashCardsSetId,
            name: req.body.name,
            cards: req.body.main
        }
          
        UserDatabase.findOneAndUpdate(
        { _id: id, 'studySessions.id': sessionId },
        { $push: { 'studySessions.$.flashCardsList': newFlashCardSet } },
        { new: true }
        )
        .then((updatedDocument) => {
        console.log(updatedDocument);
        })
        .catch((error) => {
        console.log(error);
        });

        const formattedUser = await UserDatabase.findById(id)
        const updatedStudySession = formattedUser.studySessions.find(session => session.id === sessionId).flashCardsList
        return res.status(201).json(updatedStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const deleteFlashCardsSet = async (req, res) => {
    try {
        const { id, sessionId, flashCardsSetId } = req.params

        console.log(flashCardsSetId)
        UserDatabase.updateOne(
        { _id: id, 'studySessions.id': sessionId },
        { $pull: { 'studySessions.$.flashCardsList': {id: flashCardsSetId} } },
        { new: true }
        )
        .then((updatedDocument) => {
        console.log(updatedDocument);
        })
        .catch((error) => {
        console.log(error);
        });

        const formattedUser = await UserDatabase.findById(id)
        const updatedStudySession = formattedUser.studySessions.find(session => session.id === sessionId).flashCardsList
        return res.status(201).json(updatedStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const editFlashCardsSet = async (req, res) => {
    try {
      const { id, sessionId, flashCardsSetId } = req.params;
      const newFlashCardSet = {
        id: req.body.id,
        name: req.body.name,
        cards: req.body.main
      }

      await UserDatabase.findOneAndUpdate(
        { _id: id, "studySessions.id": sessionId, },
        { $set: { "studySessions.$[session].flashCardsList.$[set]": newFlashCardSet } },
        { arrayFilters: [{ "session.id": sessionId }, { "set.id": flashCardsSetId }] }
      );
      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find(session => session.id === sessionId);
      const updatedFlashCardsSet = studySession.flashCardsList.find(set => set.id === flashCardsSetId);
      return res.status(201).json(updatedFlashCardsSet);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
}

export const createNewCard = async (req, res) => {
    try {
      const { id, sessionId, flashCardsSetId } = req.params;
      const { question, answer } = req.body;
      const newCard = {
        id: nanoid(),
        question,
        answer,
        stats: []
      }
      await UserDatabase.findOneAndUpdate(
        { _id: id, "studySessions.id": sessionId, },
        { $push: { "studySessions.$[session].flashCardsList.$[set].cards": newCard } },
        { arrayFilters: [{ "session.id": sessionId }, { "set.id": flashCardsSetId }] }
      );
      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find(session => session.id === sessionId);
      const updatedFlashCardsSet = studySession.flashCardsList.find(set => set.id === flashCardsSetId);
      const cards = updatedFlashCardsSet.cards;
      return res.status(201).json(cards);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
}

export const deleteCard = async (req, res) => {
    try {
      const { id, sessionId, flashCardsSetId, cardId } = req.params;
  
      const result = await UserDatabase.findOneAndUpdate(
        { _id: id, "studySessions.id": sessionId, "studySessions.flashCardsList.id": flashCardsSetId },
        { $pull: { "studySessions.$[session].flashCardsList.$[list].cards": { id: cardId } } },
        { arrayFilters: [{ "session.id": sessionId }, { "list.id": flashCardsSetId }], new: true }
      );
  
      if (!result) {
        return res.status(404).json({ error: "Card not found" });
      }
  
      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find((session) => session.id === sessionId);
      const flashCardsList = studySession.flashCardsList.find((list) => list.id === flashCardsSetId);
      const cards = flashCardsList.cards;
  
      return res.status(200).json(cards);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
}

export const addCardStat = async (req, res) => {
    try {
      const { id, sessionId, flashCardsSetId, cardId } = req.params;
      const { newCardStats } = req.body;
      // const newCardStat = {
      //   statId,
      //   dateTaken,
      //   isCorrect
      // }
      await UserDatabase.findOneAndUpdate(
        { _id: id, "studySessions.id": sessionId, },
        { $set: { "studySessions.$[session].flashCardsList.$[set].cards.$[card].stats": newCardStats } },
        { arrayFilters: [{ "session.id": sessionId }, { "set.id": flashCardsSetId }, { "card.id": cardId } ] }
      );
      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find(session => session.id === sessionId);
      const updatedFlashCardsSet = studySession.flashCardsList.find(set => set.id === flashCardsSetId);
      const cards = updatedFlashCardsSet.cards;
      return res.status(201).json(cards);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
}

export const createNewQuiz = async (req, res) => {
  console.log("hit")
    try {
        const { id, sessionId } = req.params
        const newQuiz = {
            "id": nanoid(),
            "name": req.body.name,
            "questions": req.body.questions,
            "stats": []
        }
          
        UserDatabase.findOneAndUpdate(
        { _id: id, 'studySessions.id': sessionId },
        { $push: { 'studySessions.$.quizes': newQuiz } },
        { new: true }
        )
        .then((updatedDocument) => {
        console.log(updatedDocument);
        })
        .catch((error) => {
          console.log(error);
        });

        const formattedUser = await UserDatabase.findById(id)
        const updatedStudySession = formattedUser.studySessions.find(session => session.id === sessionId).quizes
        return res.status(201).json(updatedStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const deleteQuiz = async (req, res) => {
    try {
        const { id, sessionId, quizId } = req.params

        UserDatabase.updateOne(
        { _id: id, 'studySessions.id': sessionId },
        { $pull: { 'studySessions.$.quizes': {id: quizId} } },
        { new: true }
        )
        .then((updatedDocument) => {
        console.log(updatedDocument);
        })
        .catch((error) => {
        console.log(error);
        });

        const formattedUser = await UserDatabase.findById(id)
        const updatedStudySession = formattedUser.studySessions.find(session => session.id === sessionId).quizes
        return res.status(201).json(updatedStudySession)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const addQuizQuestion = async (req, res) => {
    try {
      const { id, sessionId, quizId } = req.params;
      const { questionPrompt, options } = req.body;
      const newQuestion = {
        id: nanoid(),
        questionPrompt,
        options,
    }
    

      await UserDatabase.findOneAndUpdate(
        { _id: id, "studySessions.id": sessionId, },
        { $push: { "studySessions.$[session].quizes.$[quiz].questions": newQuestion } },
        { arrayFilters: [{ "session.id": sessionId }, { "quiz.id": quizId }] }
      );
      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find(session => session.id === sessionId);
      const updatedQuiz = studySession.quizes.find(quiz => quiz.id === quizId);
      const questions = updatedQuiz.questions;
      return res.status(201).json(questions);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
}

export const deleteQuizQuestion = async (req, res) => {
    try {
      const { id, sessionId, quizId, questionId } = req.params;
  
      const result = await UserDatabase.findOneAndUpdate(
        { _id: id, "studySessions.id": sessionId, "studySessions.quizes.id": quizId },
        { $pull: { "studySessions.$[session].quizes.$[quiz].questions": { id: questionId } } },
        { arrayFilters: [{ "session.id": sessionId }, { "quiz.id": quizId }], new: true }
      );
  
      if (!result) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find((session) => session.id === sessionId);
      const quizes = studySession.quizes.find((quiz) => quiz.id === quizId);
      const question = quizes.questions;
  
      return res.status(200).json(question);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
}

export const addQuizStat = async (req, res) => {
    try {
      const { id, sessionId, quizId } = req.params;
      const newQuizStat = req.body;
      
    
      await UserDatabase.findOneAndUpdate(
        { _id: id, "studySessions.id": sessionId, },
        { $push: { "studySessions.$[session].quizes.$[quiz].stats": newQuizStat } },
        { arrayFilters: [{ "session.id": sessionId }, { "quiz.id": quizId }] }
      );
      const user = await UserDatabase.findById(id);
      const studySession = user.studySessions.find(session => session.id === sessionId);
      const updatedQuiz = studySession.quizes.find(quiz => quiz.id === quizId);
      const quizStats = updatedQuiz.stats;
      return res.status(201).json(quizStats);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
}