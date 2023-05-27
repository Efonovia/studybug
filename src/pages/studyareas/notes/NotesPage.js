import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {     useParams } from "react-router-dom";
import Note from "../../../components/Note";
import { getUser, httpCreateNewNote } from "../../../hooks/requests.hooks";
import { setUser } from "../../../state/state";
import DashboardNav from "../../../components/app/DashboardNav";
import "../../../styles/notepage.css"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function NotesPage() {
    let userInfo = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const sessionId = useParams().sessionId

    async function createNewNote() {
        await httpCreateNewNote(userInfo._id, sessionId)
        const updatedUserInfo = await getUser(userInfo._id)
        dispatch(setUser({ user: updatedUserInfo }))
    }

    const noteElements = userInfo.studySessions.find(item => item.id === sessionId).notes.map(el => {
        return <Note userId={userInfo._id} key={el.id} data={el} sessionId={sessionId}/>
    })


    return <>
        <DashboardNav />
        <div className="notes-area">
            {
                userInfo.studySessions.find(item => item.id === sessionId).notes.length < 1
                ? <>
                    <h1>You don't have any notes</h1> 
                </>
                : noteElements
            }
            <Fab sx={{position: "fixed", bottom: 16, right: 20}} onClick={createNewNote} color="purple" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    </>
}


export default NotesPage