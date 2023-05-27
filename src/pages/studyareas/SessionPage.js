import { useNavigate, useParams } from "react-router-dom"
import DashboardNav from "../../components/app/DashboardNav"
import quizLogo from "../../images/quiz.png"
import noteLogo from "../../images/notes.png"
import flashcardLogo from "../../images/flashcards.png"
import statsLogo from "../../images/stats.png"
import "../../styles/session.css"
import { useSelector } from "react-redux"



function SessionPage() {
    const navigate = useNavigate()
    let { sessionId } = useParams()
    const userInfo = useSelector(state => state.user)
    const sessionName = userInfo.studySessions.find(session => session.id === sessionId).name
    console.log(useParams())
    function handleClick(area) {
        navigate(`/dashboard/session/${sessionId}/${area}`)
    }
    
    return <>
    <DashboardNav />
        <h1 className="name" style={{zIndex: 9, color: "white"}}>Your study materials for {sessionName}</h1>
        <div className="resources">
            <div onClick={() => handleClick("notes")}>
                <img src={noteLogo} alt=""></img>
                <h3>View Notes</h3>
            </div>
            <div onClick={() => handleClick("quizes")}>
                <img src={quizLogo} alt=""></img>
                <h3>View quizes</h3>
            </div>
            <div onClick={() => handleClick("flashcards")}>
                <img src={flashcardLogo} alt=""></img>
                <h3>View flashCards</h3>
            </div>
                
            <div onClick={() => handleClick("stats")}>
                <img src={statsLogo} alt=""></img>
                <h3>View Your studying progress and stats</h3>
            </div>
        </div>
    </>
}


export default SessionPage