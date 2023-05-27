import React from "react";
import { useNavigate } from "react-router-dom";


function StatsPage(props) {
    console.log(props.data)
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/dashboard/session/${props.data.id}`)
    }

    return <>
        <div onClick={handleClick} style={{height: "100px", width: "300px", background: "black"}}></div>
        <h3>{props.data.name}</h3>
    </>
}


export default StatsPage