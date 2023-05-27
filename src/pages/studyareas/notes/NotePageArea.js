import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, httpEditNote } from "../../../hooks/requests.hooks";
import { setUser } from "../../../state/state";
import DashboardNav from "../../../components/app/DashboardNav";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function NotePageArea() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const { sessionId, noteId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user)
    const originalNoteDetails = {
        name: userInfo.studySessions.find(session => session.id === sessionId).notes.find(note => note.id === noteId).name,
        content: userInfo.studySessions.find(session => session.id === sessionId).notes.find(note => note.id === noteId).content,
    }
    const [noteDetails, setNoteDetails] = React.useState({
        name: originalNoteDetails.name,
        content: originalNoteDetails.content,
    })    
    const sessionName = userInfo.studySessions.find(session => session.id === sessionId).name

    async function saveNote() {
        if(noteDetails.name !== originalNoteDetails.name || noteDetails.content !== originalNoteDetails.content) {
            let details
            if(noteDetails.name !== originalNoteDetails.name && noteDetails.content === originalNoteDetails.content) {
                details = {name: noteDetails.name}
            } else if(noteDetails.name === originalNoteDetails.name && noteDetails.content !== originalNoteDetails.content) {
                details = {content: noteDetails.content}
            } else if(noteDetails.name !== originalNoteDetails.name && noteDetails.content !== originalNoteDetails.content) {
                details = {
                    name: noteDetails.name,
                    content: noteDetails.content,
                }
            }
    
            console.log(details)
            if(noteDetails.name) {
                handleOpen()
                await httpEditNote(userInfo._id, sessionId, noteId, details)
                const updatedUserInfo = await getUser(userInfo._id)
                dispatch(setUser({ user: updatedUserInfo }))
                setOpen(false)
            }
        } 
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setNoteDetails(prevNoteDetails => {
            return {
                ...prevNoteDetails,
                [name]: value,
            }
        })
    }

    return <>
        <DashboardNav />
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
        <div className="header">
            <h2>{sessionName} note</h2>
            <div>
                <div onClick={saveNote}  style={{background: (noteDetails.name === originalNoteDetails.name && noteDetails.content === originalNoteDetails.content) ? "gray" : "purple"}}>Save</div>
                <div onClick={() => navigate(`/dashboard/session/${sessionId}/notes`)}>Cancel</div>
            </div>
        </div>
        <div className="note-area">
            <input className="title-area" onChange={handleChange} name="name" type="text" value={noteDetails.name}></input> <br></br>
            <textarea className="text-area" onChange={handleChange} name="content" value={noteDetails.content}></textarea>
        </div>
    </>
}


export default NotePageArea