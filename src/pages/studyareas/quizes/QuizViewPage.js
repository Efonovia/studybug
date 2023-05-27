import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../../../components/quizes/Question";
import {nanoid} from "nanoid"
import { getUser, httpAddQuizStat } from "../../../hooks/requests.hooks";
import { setUser } from "../../../state/state";
import DashboardNav from "../../../components/app/DashboardNav";
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


function QuizViewPage() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector((state) => state.user);
    const [showResults, setShowResults] = React.useState(false)
    const { sessionId, quizId } = useParams();
    const [selectedOptions, setSelectedOptions] = useState(
        userInfo.studySessions.find((session) => session.id === sessionId)
            .quizes.find((quiz) => quiz.id === quizId).questions.map(
            () => null
        )
    );
    
    const [score, setScore] = React.useState(null)
    const quizInfo = userInfo.studySessions
        .find((session) => session.id === sessionId)
        .quizes.find((quiz) => quiz.id === quizId);

    function handleOptionSelect(questionIndex, option) {
        console.log(option)
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.map((prevSelectedOption, index) =>
                index === questionIndex ? option : prevSelectedOption
            )
        );
    }

    const questionElements = quizInfo.questions.map((question, i) => (
        <>
            <Question
                key={question.id}
                showResults={showResults}
                index={i + 1}
                options={question.options}
                questionPrompt={question.questionPrompt}
                onOptionSelect={(option) => handleOptionSelect(i, option)}
                selectedOptionId={selectedOptions[i]}
            />
            <hr />
        </>
    ));

    function handleSubmit() {
        console.log(selectedOptions);
        setShowResults(true)
        const correctQuestions = selectedOptions
        setScore(correctQuestions.filter(question => question && question.isCorrect).length)
        console.log(score)
    }

    async function saveSession() {
        handleOpen()
        console.log(score)
        const stat = {
            id: nanoid(),
            dateTaken: new Date().getTime(),
            score,
            questionAmount: quizInfo.questions.length,
        }
        try {
            await httpAddQuizStat(userInfo._id, sessionId, quizId, stat)
            const updatedUserInfo = await getUser(userInfo._id)
            dispatch(setUser({ user: updatedUserInfo }))
            navigate(`/dashboard/session/${sessionId}/quizes`)
        } catch(err) {
            alert(err.message)
        }
    }

    return (
        <>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
            <DashboardNav />
            <div className="quiz-view-header">
                <div onClick={saveSession}>Save Session and return</div>
                <div onClick={() => navigate(`/dashboard/session/${sessionId}/quizes`)}>Quit</div>
            </div>
            {showResults && <h1 className="score">{score}/{quizInfo.questions.length}</h1>}
            <div className="questions-area">
                <h1>{quizInfo.name.toUpperCase()}</h1>
                <div>{questionElements}</div>
                <div className="submit">

                <Button onClick={handleSubmit} variant="contained" color="success">
                    Submit
                </Button>
                </div>
            </div>
        </>
    );
}

export default QuizViewPage;
