import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, httpDeleteQuiz } from "../../hooks/requests.hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/state";
import quizLogo from "../../images/quiz.png"
import statsLogo from "../../images/stats.png"
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Quiz(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    function viewQuiz(event) {
        event.stopPropagation()
        navigate(`/dashboard/session/${props.sessionId}/quizes/view/${props.data.id}`)
    }

    function viewQuizStats(event) {
        event.stopPropagation()
        navigate(`/dashboard/session/${props.sessionId}/quizes/${props.data.id}/stats`)
    }

    async function deleteQuiz(event) {
        event.stopPropagation()
        try {
            await httpDeleteQuiz(props.userId, props.sessionId, props.data.id)
            const updatedUserInfo = await getUser(props.userId)
            dispatch(setUser({ user: updatedUserInfo }))
        } catch (error) {
            throw Error(error) //!FIND A WAY TO HANDLE ERRORS THAT STEM FROM RESULTS NOT GOING THROUGH DUE TO INTERNET CONNECTION
        }
    }

    return <>
        <div className="quiz-button">
            <img src={quizLogo} alt=""></img>
            <h3>quiz: {props.data.name}</h3>
        <div className="quiz-tools">
            <Fab color="primary" aria-label="delete">
                <DeleteIcon onClick={deleteQuiz} />
            </Fab>
            <Fab color="primary" aria-label="delete">
                <EditIcon />
            </Fab>
            <Fab onClick={viewQuizStats}  color="primary" aria-label="delete">
                <img height={40} width={40} alt="" src={statsLogo}></img>
            </Fab>
            <Fab onClick={viewQuiz} color="primary" aria-label="open">
                open
            </Fab>
        </div>
        </div>
    </>
}


export default Quiz