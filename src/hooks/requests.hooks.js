const API_URL = "http://localhost:8000/users"


export const getUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    return await response.json()
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}


export const httpCreateNewSession = async (userId, sessionName) => {
  try {
    await fetch(`${API_URL}/${userId}/createstudysession`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: sessionName})
    })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpCreateNewNote = async (userId, sessionId) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/notes/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: "untitled", content: ""})
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpEditNote = async (userId, sessionId, noteId, details) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/notes/edit/${noteId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...details})
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpDeleteNote = async (userId, sessionId, noteId) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/notes/delete/${noteId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpCreateNewFlashCardsSet = async (userId, sessionId, name, cards) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/flashcardsset/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: name, main: cards})
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpDeleteFlashCardsSet = async (userId, sessionId, flashCardsSetId) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/flashcardsset/delete/${flashCardsSetId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpEditFlashCardsSet = async (userId, sessionId, flashcardssetId, name, cards) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/flashcardsset/edit/${flashcardssetId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: flashcardssetId, name: name, main: cards})
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpAddCardStat = async (userId, sessionId, flashcardssetId, cardId, stat) => {
  console.log(userId, sessionId, flashcardssetId, cardId, stat)
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/flashcardsset/addcardstat/${flashcardssetId}/${cardId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newCardStats: stat })
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpCreateQuiz = async (userId, sessionId, quizid, name, questions) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/quizes/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, questions })
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

export const httpDeleteQuiz = async (userId, sessionId, quizId) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/quizes/delete/${quizId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}


export const httpAddQuizStat = async (userId, sessionId, quizId, stat) => {
  try {
    await fetch(`${API_URL}/${userId}/${sessionId}/quizes/addquizstat/${quizId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stat)
  })
  } catch (error) {
    console.log(error)
    alert("something went wrong")
  }
}

