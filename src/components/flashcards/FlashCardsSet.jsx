import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, httpDeleteFlashCardsSet } from "../../hooks/requests.hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/state";
import flashCardLogo from "../../images/flashcards.png"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from "@mui/material";
import statsLogo from "../../images/stats.png"


function FlashCardsSet(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function viewFlashCardsSet(event) {
        event.stopPropagation()
        navigate(`/dashboard/session/${props.sessionId}/flashcardsset/view/${props.data.id}`)
    }

    function editFlashCardsSet(event) {
        event.stopPropagation()
        navigate(`/dashboard/session/${props.sessionId}/flashcardsset/edit/${props.data.id}`)
    }

    async function deleteFlashCardsSet(event) {
        event.stopPropagation()
        await httpDeleteFlashCardsSet(props.userId, props.sessionId, props.data.id)
        const updatedUserInfo = await getUser(props.userId)
        dispatch(setUser({ user: updatedUserInfo }))
    }

    return <>
        <div className="flashcard-button">
            <img alt="" src={flashCardLogo}></img>
            <h3>flashcard: {props.data.name}</h3>
            <p>created at: 22/3/23</p>
            <div className="flashcard-tools">
                <Fab color="primary" aria-label="delete">
                    <DeleteIcon onClick={deleteFlashCardsSet} />
                </Fab>
                <Fab color="primary" aria-label="edit">
                    <EditIcon onClick={editFlashCardsSet} />
                </Fab>
                <Fab onClick={viewFlashCardsSet} color="primary" aria-label="open">
                    Open
                </Fab>
                <Fab color="primary" aria-label="delete">
                <img height={40} width={40} alt="" src={statsLogo}></img>
            </Fab>
            </div>
        </div>
    </>
}


export default FlashCardsSet