import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { getUser, httpEditFlashCardsSet } from "../../../hooks/requests.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../state/state";
import CardEditor from "../../../components/flashcards/CardEditor";
import DashboardNav from "../../../components/app/DashboardNav";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from "@mui/material";

function FlashCardsSetEditPage() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { sessionId, flashcardssetId } = useParams()
    let flashCardsSet = userInfo.studySessions.find(session => session.id === sessionId).flashCardsList.find(flashCardsSet => flashCardsSet.id === flashcardssetId)
    const [cardEditors, setCardEditors] = React.useState(flashCardsSet.cards)
    const [name, setName] = React.useState(flashCardsSet.name)

    const cardEditorElements = cardEditors.map((cardEditor, index) => {
        return (
            <div key={cardEditor.id}>
                <CardEditor
                    data={cardEditor}
                    onCardDetailsChange={(cardDetails) => handleCardDetailsChange(index, cardDetails)}
                />
                <Fab sx={{position: "relative", top: -50, right: -920}} size="small" color="primary" aria-label="delete">
                <DeleteIcon onClick={() => deleteCardEditor(cardEditor.id)} />
            </Fab>
            </div>
        );
    });

    function handleCardDetailsChange(index, cardDetails) {
        setCardEditors(prevCardEditors => {
            const newCardEditors = [...prevCardEditors];
            newCardEditors[index] = {
                ...newCardEditors[index],
                ...cardDetails
            };
            return newCardEditors;
        });
    }
    
    function deleteCardEditor(id) {
        if(cardEditors.length > 1) {
            setCardEditors(cardEditors.filter(editor => editor.id !== id))
        }
    }
    
    function addCardEditor() {
        if(cardEditors <= 20) {
            setCardEditors(prev => [...prev, {id: nanoid(), question: "", answer: "", stats: []}])
        } else {
            alert("wow, that's a lot of flashcards but unfortunately, You've reached the max flashcard limit. try creating another flashcards set")
        }
    }

    async function createFlashCardsSet() {
        if(cardEditors.some(editor => editor.question === "" || editor.answer === "") || name === "") {
            alert("Cannot create flashcard with an empty question or answer")
        } else {
            console.log(userInfo._id, sessionId, flashcardssetId, name, cardEditors)
            await httpEditFlashCardsSet(userInfo._id, sessionId, flashcardssetId, name, cardEditors)
            const updatedUserInfo = await getUser(userInfo._id)
            dispatch(setUser({ user: updatedUserInfo }))
            navigate(`/dashboard/session/${sessionId}/flashcards`)
        }
    }

    function handleNameChange(event) {
        setName(event.target.value)
    }

    return <>
        <DashboardNav />
        <div>
            <div className="flashcards-header">
                <div onClick={createFlashCardsSet}>Save changes</div>
                <div onClick={() => navigate(`/dashboard/session/${sessionId}/flashcards`)}>Cancel</div>
            </div>
        </div>
        {/* <h2>In order to preserve and accurately track your stats, just create a new card when making major changes to a card, so that the stats will be legit</h2> */}
        <div className="flashcard-creation-area">
            <input className="title-area" placeholder="give your flashcards a name" name="name" value={name} onChange={handleNameChange}></input>
            {cardEditorElements}
        </div>
        <Fab sx={{position: "relative", right: -920}} size="large" color="primary" aria-label="delete">
            <AddIcon onClick={addCardEditor} />
        </Fab>
        
    </>
}


export default FlashCardsSetEditPage