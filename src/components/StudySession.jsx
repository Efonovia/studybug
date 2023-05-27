import React from "react";
import { useNavigate } from "react-router-dom";
import sessionLogo from "../images/studysession.png"


function StudySession(props) {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/dashboard/session/${props.data.id}`)
    }

    return <>
        <div className="session-button" onClick={handleClick}>
            <img src={sessionLogo} alt=""></img>
            <hr style={{width: "200px"}}></hr>
            <h3>{props.data.name}</h3>
        </div>
    </>
}


export default StudySession