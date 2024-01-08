import React from "react";
import QuestionCreator from "../../../components/quizes/QuestionCreator";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { getUser, httpCreateQuiz } from "../../../hooks/requests.hooks";
// import { setUser } from "../../../state/state";
import DashboardNav from "../../../components/app/DashboardNav";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from "@mui/material";

function QuizCreationPage() {
    const [name, setName] = React.useState("")
    const [questionsAmount, setQuestionsAmount] = React.useState(5)
    const [shouldSubmit, setShouldSubmit] = React.useState(false)
    // const [collectedData, setCollectedData] = React.useState([]);
    const userInfo = useSelector(state => state.user)
    const sessionId = useParams().sessionId
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const quizId = nanoid()
    const questionCreatorsElements = Array.from({ length: questionsAmount }, (_, i) => (
        <QuestionCreator sessionId={sessionId} quizId={quizId} userId={userInfo._id} key={i+1} index={i+1} submitData={submitData} shouldSubmit={shouldSubmit} setShouldSubmit={setShouldSubmit}/>
      ))

    function addQuestion() {
        if (questionsAmount < 50) {
            setQuestionsAmount(prevQuestionsAmount => prevQuestionsAmount += 1)
        } else {
            alert("Wow! that's a lot of questions")
        }
    }

    function removeQuestion() {
        if (questionsAmount > 5) {
            setQuestionsAmount(prevQuestionsAmount => prevQuestionsAmount -= 1)
        }
    }

    let allData = []
    function submitData(data) {
        allData.push(data)
        console.log(allData)
        const uniqueQuestions = allData.filter((question, index, self) => index === self.map(q => q.questionPrompt).indexOf(question.questionPrompt))
        console.log(uniqueQuestions)
        // setCollectedData(prev => [...prev, data])
    }
    console.log(allData)


    function nameOnchange(event) {
        setName(event.target.value)
    }
    // async function createQuiz() {
    //     // await httpCreateQuiz(userInfo._id, sessionId, quizId, name)
    //     setShouldSubmit(true)
    //     console.log(collectedData)
    //     console.log("name: ", name)
    //     // console.log(questionsData)
    //     // if(name && questionsData.some(question => question.questionPrompt && question.options.some(option => option.optionText && option.isCorrect))) {
    //     //     console.log(questionsData)
    //     //     await createQuiz(userInfo._id, sessionId, name, questionsData)
    //     //     const updatedUserInfo = await getUser(userInfo._id)
    //     //     dispatch(setUser({ user: updatedUserInfo }))
    //     //     navigate(`/dashboard/session/${sessionId}/flashcards`)
    //     // } else {
    //     //     console.log("something is missing")
    //     // }
    // }


    return <>
        <DashboardNav />
        <div className="header">
            <div className="quiz-header">
                <div>Save and create</div>
                <div onClick={() => navigate(`/dashboard/session/${sessionId}/quizes`)}>Cancel</div>
            </div>
        </div>
        <div className="quiz-creation-area">

            Name of quiz: <br></br>
            <input className="title-area" onChange={nameOnchange} name="name" type="text" value={name}></input>
            {questionCreatorsElements}<br></br>
        </div>

        <Fab sx={{position: "relative", bottom: 16, right: 20}} onClick={addQuestion} color="purple" aria-label="add">
            <AddIcon />
        </Fab>
        <Fab sx={{position: "relative", bottom: 16, right: 180}} onClick={removeQuestion} color="purple" aria-label="add">
            <DeleteIcon />
        </Fab>
    </>
}


export default QuizCreationPage