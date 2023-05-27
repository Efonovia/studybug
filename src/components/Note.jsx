import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, httpDeleteNote } from "../hooks/requests.hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../state/state";
import { Fab } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import noteLogo from "../images/notes.png"

function Note(props) {
    console.log(props.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/dashboard/session/${props.sessionId}/notes/${props.data.id}`)
    }

    async function deleteNote(event) {
        event.stopPropagation()
        await httpDeleteNote(props.userId, props.sessionId, props.data.id)
        const updatedUserInfo = await getUser(props.userId)
        dispatch(setUser({ user: updatedUserInfo }))
    }

    return <>
        <div className="note-button" onClick={handleClick}>
            <img src={noteLogo} alt=""></img>
            <h3>Note: {props.data.name}</h3>
        </div>
            <Fab sx={{position: "relative", top: 280, right: 80}} color="primary" aria-label="delete">
                <DeleteIcon onClick={deleteNote} />
            </Fab>
    </>
}


export default Note