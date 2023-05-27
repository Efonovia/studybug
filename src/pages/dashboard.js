import React from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudySession from "../components/StudySession";
import { getUser, httpCreateNewSession } from "../hooks/requests.hooks";
import { setUser } from "../state/state"
import "../styles/dashboard.css"
import sessionLogo from "../images/studysession.png"
import quizLogo from "../images/quiz.png"
import noteLogo from "../images/notes.png"
import flashcardLogo from "../images/flashcards.png"
import DashboardNav from "../components/app/DashboardNav";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

//! DONT FORGET TO CATCH THE ERROR OF USERINFO BEING UNDEFINED SO THAT THE USER CAN LOGIN AGAIN OR JUST GET THE USER INFO IN EVERY PAGE
export default function Dashboard() {
  const [sessionName, setSessionName] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleSessionNameChange = (event) => {
    setSessionName(event.target.value);
  };

  const handleSaveClick = () => {
    console.log(sessionName);
    setSessionName('');
    setDialogOpen(false);
  };

  const handleClose = () => {
    setSessionName('');
    setDialogOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [user] = useAuthState(auth);
  let userInfo = useSelector((state) => state.user)

  React.useEffect(() => {
    if (!userInfo) {
      console.log("yup")
      navigate('/auth/login');
    }
}, [navigate, userInfo])
  
  const userStudySessions = useSelector((state) => state.user.studySessions)

  const userStudySessionsElements = userStudySessions.map(el => {
    return <StudySession key={el.id} data={el}/>
  })

  async function createNewStudySession() {
    setDialogOpen(true)
    if(sessionName){
      console.log(sessionName)
      await httpCreateNewSession(userInfo._id, sessionName)
      const updatedUserInfo = await getUser(userInfo._id)
      console.log(updatedUserInfo)
      dispatch(setUser({ user: updatedUserInfo }))
      console.log(userInfo)
    }
  }

    return (
      <div>
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>What would you like to call this session</DialogTitle>
          <DialogContent>
            <TextField
              value={sessionName}
              onChange={handleSessionNameChange}
              fullWidth
              margin="dense"
              variant="outlined"
              sx={{ outlineColor: "purple" }}
            />
            <Button onClick={handleSaveClick} variant="contained" sx={{ bgcolor: "purple", mt: 2 }}>
              Create
            </Button>
          </DialogContent>
        </Dialog>
        <DashboardNav createNewStudySession={createNewStudySession}/>
        <h1 style={{textAlign: "center"}}>Welcome back Michael!</h1>
        <div className="get-started">
          <div  onClick={createNewStudySession} className="feature-button">
            New Study Session <img src={sessionLogo} alt=""></img>
          </div>
          <div className="feature-button">
            New quiz <img height={80} src={quizLogo} alt=""></img>
          </div>
          <div className="feature-button">
            New Note <img src={noteLogo} alt=""></img>
          </div>
          <div className="feature-button">
            New Flashcard <img src={flashcardLogo} alt=""></img>
          </div>
        </div>
        <h4 style={{textAlign: "center"}}>Your study sessions:</h4>
        <div className="sessions-area" style={{height: "500px", width: "900px"}}>
          {userInfo.studySessions.length < 1 && <h1 style={{color: "white"}}>You don't have any study session created yet</h1>}
          
          {userStudySessionsElements}
        </div>
      </div>
    );
}