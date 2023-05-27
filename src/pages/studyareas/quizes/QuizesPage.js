import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "../../../components/quizes/Quiz";
import DashboardNav from "../../../components/app/DashboardNav";
import "../../../styles/quizpage.css"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function QuizesPage() {
    const navigate = useNavigate()
    const sessionId = useParams().sessionId
    const userInfo = useSelector(state => state.user)


    const quizElements = userInfo.studySessions.find(item => item.id === sessionId).quizes.map(el => {
        return <Quiz userId={userInfo._id} key={el.id} data={el} sessionId={sessionId}/>
    })


    return <>
        <DashboardNav />
        <div className="quizes-area">
            {
                userInfo.studySessions.find(item => item.id === sessionId).quizes.length < 1
                ? <>
                    <h1 style={{color: "white"}}>You don't have any quizes yet</h1> 
                </>
                : quizElements
            }
            <Fab sx={{position: "fixed", bottom: 16, right: 20}} onClick={() => navigate(`/dashboard/session/${sessionId}/quizes/create`)} color="purple" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    </>
}


export default QuizesPage