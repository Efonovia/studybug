import { Box, TextField } from "@mui/material";
import React from "react";



function CardCreator(props) {
    const [cardDetails, setCardDetails] = React.useState({
        question: "",
        answer: ""
    })
  
    function handleChange(event) {
        const { value, name } = event.target;
        setCardDetails(prevCardDetails => {
            return {
                ...prevCardDetails,
                [name]: value,
            }
        })

    }

    React.useEffect(() => {
        props.data.question = cardDetails.question
        props.data.answer = cardDetails.answer

    })
    

    return <>
        <div className="flashcard-creator">
        <Box
            component="form"
            sx={{'& > :not(style)': { bgcolor: "white", m: 1, width: '120ch' }, }}
            noValidate
            autoComplete="on">
            <TextField 
            id="filled-basic" 
            placeholder="enter flashcard term" 
            variant="filled" 
            type="text"
            onChange={handleChange} 
            name="question"
            value={cardDetails.question}
            className="email"
            required/></Box>

        <Box
            component="form"
            sx={{'& > :not(style)': { bgcolor: "white", m: 1, width: '120ch' }, }}
            noValidate
            autoComplete="on">
            <TextField 
            id="filled-basic" 
            placeholder="enter flashcard definition" 
            variant="filled" 
            type="text"
            onChange={handleChange} 
            name="answer"
            value={cardDetails.answer}
            className="email"
            required/></Box>
            
        </div>
    </>
}


export default CardCreator