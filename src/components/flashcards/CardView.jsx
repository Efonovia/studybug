import { nanoid } from "@reduxjs/toolkit";
import React from "react";


function CardView(props) {
    const [reveal, setReveal] = React.useState(false)
    const { data, changeStat, statsData, sessionTime } = props
    function recordStat(status) {
        console.log(data.answer)
        console.log(statsData)
        // console.log(statsData.stats[statsData.length-1])
        const newStat = {
            statId: statsData.stats.length > 0  && statsData.stats.find(stat => stat.sessionTime === sessionTime) ? statsData.stats.find(stat => stat.sessionTime === sessionTime).statId : nanoid(),
            sessionTime: sessionTime,
            dateTaken: new Date().getTime(),
            isCorrect: status
        }

        console.log(newStat)
        changeStat(data, newStat)
        console.log("__________________________________________________")
    }

    return (
        <>
            <div className="card">
                <div className={reveal ? "content" : "regular"}>
                    <div className="front"><h2>{data.question}</h2></div>
                    <div className="back"><h2>{data.answer}</h2></div>
                </div>
            </div>

                <div className="hide-reveal" onClick={() => setReveal(prev => !prev)}>{reveal ? "Hide" : "Reveal"}</div>
                {reveal && <>
                <h3>Did you get it?</h3>
                <div className="feedback">
                    <div onClick={() => recordStat(true)}>Yes</div>
                    <div onClick={() => recordStat(false)}>No</div>
                </div>
                </>
                }
        </>
    )
}


export default CardView