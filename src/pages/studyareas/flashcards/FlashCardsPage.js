import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FlashCardsSet from "../../../components/flashcards/FlashCardsSet";
import DashboardNav from "../../../components/app/DashboardNav";
import "../../../styles/flashcards.css"
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


function FlashCardsPage() {
    let userInfo = useSelector((state) => state.user)
    const navigate = useNavigate()
    const sessionId = useParams().sessionId

    const flashCardsSetElements = userInfo.studySessions.find(item => item.id === sessionId).flashCardsList.map(el => {
        return <FlashCardsSet userId={userInfo._id} key={el.id} data={el} sessionId={sessionId}/>
    })


    return <>
        <DashboardNav />
        <h1>Your Flashcards</h1>
        <div className="flashcards-area">
            {
                userInfo.studySessions.find(item => item.id === sessionId).flashCardsList.length < 1
                ? <>
                    <h1 style={{color: "white"}}>You don't have any flashcards</h1> 
                </>
                : flashCardsSetElements
            }
            <Fab sx={{position: "fixed", bottom: 16, right: 20}} onClick={() => navigate(`/dashboard/session/${sessionId}/flashcardsset/create`)} color="purple" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    </>
}


export default FlashCardsPage