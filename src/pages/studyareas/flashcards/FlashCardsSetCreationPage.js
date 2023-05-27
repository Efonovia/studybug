import React from "react";
import CardCreator from "../../../components/flashcards/CardCreator";
import { nanoid } from "@reduxjs/toolkit";
import { getUser, httpCreateNewFlashCardsSet } from "../../../hooks/requests.hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUser } from "../../../state/state";
import DashboardNav from "../../../components/app/DashboardNav";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";


function FlashCardsSetCreationPage() {
    const cardCreatorInfo = [
        {
            id: nanoid(),
            question: "",
            answer: "",
            stats: []
        },
        {
            id: nanoid(),
            question: "",
            answer: "",
            stats: []
        },
        {
            id: nanoid(),
            question: "",
            answer: "",
            stats: []
        },
        {
            id: nanoid(),
            question: "",
            answer: "",
            stats: []
        },
        {
            id: nanoid(),
            question: "",
            answer: "",
            stats: []
        },
    ]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user)
    const sessionId = useParams().sessionId
    const [cardCreators, setCardCreators] = React.useState(cardCreatorInfo)
    const [name, setName] = React.useState("")

    const cardCreatorElements = cardCreators.map(el => {
        return <div key={el.id}>
            <CardCreator data={el}/>
            <Fab sx={{position: "relative", top: -50, right: -920}} size="small" color="primary" aria-label="delete">
                <DeleteIcon onClick={() => deleteCardCreator(el.id)} />
            </Fab>
        </div>
    })
    
    function deleteCardCreator(id) {
        if(cardCreators.length > 1) {
            setCardCreators(cardCreators.filter(creator => creator.id !== id))
        }
    }
    
    function addCardCreator() {
        if(cardCreators <= 20) {
            setCardCreators(prev => [...prev, {id: nanoid(), question: "", answer: "", stats: []}])
        } else {
            alert("wow, that's a lot of flashcards but unfortunately, You've reached the max flashcard limit. try creating another flashcards set")
        }
    }

    async function createFlashCardsSet() {
        if(cardCreators.some(creator => creator.question === "" || creator.answer === "") || name === "") {
            alert("Cannot create flashcard with an empty question or answer or name")
        } else {
            console.log(cardCreators)
            await httpCreateNewFlashCardsSet(userInfo._id, sessionId, name, cardCreators)
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
                <div onClick={createFlashCardsSet}>Save and create</div>
                <div onClick={() => navigate(`/dashboard/session/${sessionId}/flashcards`)}>Cancel</div>
            </div>
        </div>
        <div className="flashcard-creation-area">
            <input className="title-area" placeholder="give your flashcards a name" name="name" value={name} onChange={handleNameChange}></input>
            {cardCreatorElements}
        </div>
        <Fab sx={{position: "relative", right: -920}} size="large" color="primary" aria-label="delete">
            <AddIcon onClick={addCardCreator} />
        </Fab>
    </>
}


export default FlashCardsSetCreationPage